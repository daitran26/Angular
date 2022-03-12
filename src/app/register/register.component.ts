import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpForm } from '../model/signUpForm';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  status = ''
  form:any = {}
  hide=true
  hide1=true
  signUpForm!:SignUpForm;

  registerForm!: FormGroup;
  submitted = false;

  emailFormControl:FormControl = new FormControl('',[
    Validators.required,
    Validators.email
  ]);
  constructor(private authService: AuthService,private fb: FormBuilder,private router:Router,private alertService: AlertService) { }

  err1:any = {
    message: 'nouser'
  }
  err2:any = {
    message: 'noemail'
  }
  success ={
    message: 'Create success'
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(30)]],
      password: ['', Validators.compose([Validators.required, this.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: this.MatchPassword('password', 'confirmPassword'),
    }
    );
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }
  patternValidator(): ValidatorFn {
    return (control: AbstractControl) => { //: { [key: string]: any }
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
  MatchPassword(password: string, confirmPassword: string) {
    return ( function (formGroup: FormGroup) {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors?.['passwordMismatch']) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
      return null;
    })
  }
  onSubmit(){
    this.submitted = true;
    if (this.registerForm.valid) {
    this.signUpForm = new SignUpForm(this.registerForm.value.name, this.registerForm.value.username,this.registerForm.value.email,this.registerForm.value.password);
    this.authService.signUp(this.signUpForm).subscribe(data => {
      if(JSON.stringify(data)==JSON.stringify(this.err1)){
        this.hide1 = false
        this.status = "Tài khoản đã tồn tại"
        // this.alertService.error('Tài khoản đã tồn tại',{autoClose:true})
      }
      if(JSON.stringify(data)==JSON.stringify(this.err2)){
        this.hide1 = false
        this.status = "Email đã đã tồn tại"
      }
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        this.hide1 = true
        this.router.navigate(['/login'])
        this.alertService.success('Đăng ký thành công.Vui lòng đăng nhập',{autoClose:true})
      }
    })
    }
  }
}
