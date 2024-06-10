import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [   // Déclarations des routes 
  { path: '', redirectTo: 'login', pathMatch:'full'},
  { path: 'login',component: LoginComponent },
  { path:'**', component: PageNotFoundComponent}  // toujours en dèrnier
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
