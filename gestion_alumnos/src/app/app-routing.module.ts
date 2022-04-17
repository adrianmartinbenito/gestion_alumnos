import { UserFormComponent } from './features/user-form/user-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './features/user-list/user-list.component';

const routes: Routes = [
  {path:'',component:UserFormComponent},
  {path:'add', component:UserFormComponent},
  {path:'list', component:UserListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
