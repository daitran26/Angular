import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpForm } from 'src/app/model/signUpForm';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-reset-password',
  templateUrl: './verify-reset-password.component.html',
  styleUrls: ['./verify-reset-password.component.css']
})
export class VerifyResetPasswordComponent implements OnInit {

  status = ''
  form:any = {}
  hide=true
  hide1=true
  code:any;
  signUpForm!:SignUpForm;

  registerForm!: FormGroup;
  submitted = false;
  constructor(private authService: AuthService,private fb: FormBuilder,private router:Router,private activatedRoute:ActivatedRoute,
    private alertService:AlertService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
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
      this.activatedRoute.queryParams.subscribe(params => {
        this.code = params['code'];
      });
      this.authService.doResetPassword(this.registerForm.value.password,this.code).subscribe(data=>{
        this.router.navigate(['/login']);
        this.alertService.success("Thay đổi mật khẩu thành công. Vui lòng đăng nhập")
      })
      console.log(this.registerForm.value)
    }
  }

}
