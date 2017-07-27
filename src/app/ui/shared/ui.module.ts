import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NavService } from './nav.service';

import { UserLoginComponent }   from '../user-login/user-login.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserFormComponent }    from '../user-form/user-form.component';
import { TopNavComponent }      from '../top-nav/top-nav.component';
import { FooterNavComponent }   from '../footer-nav/footer-nav.component';
import { ReadmePageComponent }  from '../readme-page/readme-page.component';
import { HomeComponent }  from '../home/home.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  declarations: [
    UserLoginComponent,
    UserProfileComponent,
    TopNavComponent,
    FooterNavComponent,
    UserFormComponent,
    ReadmePageComponent,
    HomeComponent
  ],
  exports: [
    TopNavComponent,
    FooterNavComponent,
    UserProfileComponent,
  ]
})
export class UiModule { }
