import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login } from '../app/components/login/login.component';
import { Shopping } from './components/shopping/shopping.component';

const routes: Routes = [
    { path: 'shopping', component: Shopping },
    { path: 'login', component: Login },

    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }