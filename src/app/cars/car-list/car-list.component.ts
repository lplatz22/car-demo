import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car.service';
import { Car } from '../shared/car';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  cars: FirebaseListObservable<Car[]>;

  showSpinner: boolean = true;


  constructor(private carService: CarService) { }

  ngOnInit() {
    this.cars = this.carService.getCarsList({limitToLast: 5})
    this.cars.subscribe(() => this.showSpinner = false)
  }

  // deleteItems() {
  //   this.carService.deleteAll()
  // }


}
