import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainComponent } from './user/pages/main/main.component';
import { mainGuard } from './guards/main.guard';


export const routes: Routes = [
    { path: 'login'     , component: LoginComponent                                     },
    { path: 'register'  , component: RegisterComponent                                  },
    { path: 'main'      , component: MainComponent },//, canActivate: [ mainGuard ]          },
    { path: '**'        , redirectTo: 'main'                                           }
];
