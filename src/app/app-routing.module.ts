import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: '/frontpage', pathMatch: 'full'},
  {path: 'frontpage', component: FrontpageComponent},
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
