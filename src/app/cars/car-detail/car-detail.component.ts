import { Component, OnInit, Input } from '@angular/core';
import { CarService } from '../shared/car.service';
import { Car } from '../shared/car';
import * as _ from "lodash";
import { AuthService } from '../../core/auth.service';



@Component({
  selector: 'car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {

  @Input() car: Car;
  selectedFiles: FileList;
  iframe_text: string;

  constructor(private carService: CarService, public auth: AuthService) { }

  ngOnInit() {
    console.log(this.car);
    if(!this.car){
      console.log('car is invalid');
    } else {
      this.makeIframeText();
    }
  }

  makeIframeText(){
    this.iframe_text = `<iframe style='border: 2px solid black; width: 600px; height: 500px;' src='https://luke-sample-app.firebaseapp.com/view/${this.auth.authState.uid}/${this.car.$key}'></iframe>`
    // this.iframe_text = `<iframe style='border: 2px solid black; width: 600px; height: 500px;' src='http://localhost:4200/view/${this.auth.authState.uid}/${this.car.$key}'></iframe>`
  }

  detectFiles(event) {
      this.selectedFiles = event.target.files;
      console.log(this.selectedFiles);
  }

  uploadPhotos() {
    let files = this.selectedFiles
    if (_.isEmpty(files)) {
      console.log('No Files');
      return;
    };

    let filesIndex = _.range(files.length)
    _.each(filesIndex, (index) => {
      this.carService.addPhoto(files[index], this.car);
    })
  }

  updateTimeStamp() {
    let date = new Date()
    this.carService.updateCar(this.car.$key, { timeStamp: date })
  }

  iterablePhotos() {
    if(!this.car.photos){
      return [];
    }
    return Object.keys(this.car.photos);
  }

  updateActive(value: boolean) {
    this.carService.updateCar(this.car.$key, { active: value })
  }

  deletePhoto(photoKey: number){
    this.carService.deletePhoto(photoKey, this.car);
  }

  deleteItem() {
    this.carService.deleteCar(this.car)
  }

}
