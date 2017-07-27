import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

import { UserLoginComponent } from './ui/user-login/user-login.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { CarListComponent } from './cars/car-list/car-list.component';
// import { UploadsListComponent } from './uploads/uploads-list/uploads-list.component';
import { ReadmePageComponent } from './ui/readme-page/readme-page.component';
import { HomeComponent } from './ui/home/home.component';
import { CarSampleComponent } from './cars/car-sample/car-sample.component';
import { CarViewComponent } from './cars/car-view/car-view.component';

import { CoreModule } from './core/core.module'

const routes: Routes = [
  { path: '',
    children: [
      { path: '', component: HomeComponent},
      { path: 'items', component: ItemsListComponent, canActivate: [AuthGuard]},
      { path: 'cars', component: CarListComponent, canActivate: [AuthGuard]},
      { path: 'login', component: UserLoginComponent, }
    ],
    component: ReadmePageComponent },
  { path: 'sample/:user_id/:car_id', component: CarSampleComponent, canActivate: [AuthGuard]},
  { path: 'view/:user_id/:car_id', component: CarViewComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }

  // { path: 'uploads', loadChildren: "./uploads/shared/upload.module#UploadModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
