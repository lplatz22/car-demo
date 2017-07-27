import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SharedModule } from '../../shared/shared.module';

import { CarService } from './car.service';
import { CarListComponent } from '../car-list/car-list.component';
import { CarFormComponent } from '../car-form/car-form.component';
import { CarDetailComponent } from '../car-detail/car-detail.component';
import { CarSampleComponent } from '../car-sample/car-sample.component';
import { CarViewComponent } from '../car-view/car-view.component';
import { CarouselModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule,
    CarouselModule
  ],
  declarations: [
    CarListComponent,
    CarFormComponent,
    CarDetailComponent,
    CarSampleComponent,
    CarViewComponent
  ],
  providers: [
    CarService
  ]
})
export class CarModule { }
