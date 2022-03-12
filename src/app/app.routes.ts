import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CheckGuard } from './guards/check.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const appRoutes: Routes = [
    // { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent},
    { path: '', loadChildren: () =>import('./home/home.module').then(mod=>mod.HomeModule) },
    { path: 'login', component:LoginComponent },
    { path: 'main', loadChildren: () =>import('./main/main.module').then(mod=>mod.MainModule),canActivate:[AuthGuard,CheckGuard] },

]

// export const appRoutes = RouterModule.forRoot(routing);
