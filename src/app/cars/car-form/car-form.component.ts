import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Car } from '../shared/car';
import { CarService } from '../shared/car.service';

@Component({
  selector: 'car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {

  car: Car = new Car();

  constructor(private carService: CarService) { }

  ngOnInit() {
  }

  createCar() {
    this.carService.createCar(this.car)
    this.car = new Car() // reset item
  }

}
