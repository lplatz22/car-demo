import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Car } from './car';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CarService {

  private basePath: string;
  private currentUploadProgress: number;

  cars: FirebaseListObservable<Car[]> = null; //  list of objects
  car: FirebaseObjectObservable<Car> = null; //   single object

  constructor(private db: AngularFireDatabase, public auth: AuthService) {
    this.basePath = '/cars/'+this.auth.authState.uid;
  }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getCarsList(query={}): FirebaseListObservable<Car[]> {
    this.cars = this.db.list(this.basePath, {
      query: query
    });
    return this.cars
  }

  // Return a single observable item
  getCar(userKey: string, carkey: string): FirebaseObjectObservable<Car> {
    const carPath =  `cars/${userKey}/${carkey}`;
    this.car = this.db.object(carPath)
    return this.car;
  }

  // Create a brand new item
  createCar(car: Car): void {
    this.cars.push(car)
      .catch(error => this.handleError(error))
  }

  // Update an exisiting item
  updateCar(key: string, value: any): void {
    this.cars.update(key, value)
      .catch(error => this.handleError(error))
  }

  // Deletes a single item
  deleteCar(car: Car): void {
    const storageRef = firebase.storage().ref();
    var photoKeys = Object.keys(car.photos);
    var promisesArray = [];
    for(var i = 0; i < photoKeys.length; i++){
      promisesArray.push(storageRef.child(`images/${car.$key}/${photoKeys[i]}`).delete());
    }
    Promise.all(promisesArray).then(() => {
      this.cars.remove(car.$key)
        .catch(error => this.handleError(error))
    })
  }

  // Deletes the entire list of items
  // deleteAll(): void {
  //     this.cars.remove()
  //       .catch(error => this.handleError(error))
  // }

  addPhoto(photo:File, car: Car): void {
    const storageRef = firebase.storage().ref();
    var d = new Date();
    var imageKey = d.getTime();
    const uploadTask = storageRef.child(`images/${car.$key}/${imageKey}`).put(photo);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        console.log('progress...', (snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        if(!car.photos){
          car.photos = {};
        }
        if(!car.keyPhoto){
          car.keyPhoto = {
            key: imageKey,
            name: photo.name,
            url: uploadTask.snapshot.downloadURL
          }
        }
        car.photos[imageKey] = {
          name: photo.name,
          url: uploadTask.snapshot.downloadURL
        }
        this.updateCar(car.$key, car)
      }
    );
  }

  deletePhoto(photoKey: number, car: Car): void {
    const storageRef = firebase.storage().ref();
    storageRef.child(`images/${car.$key}/${photoKey}`).delete()
      .then(() => {
        delete car.photos[photoKey]
        if(car.keyPhoto && car.keyPhoto.key == photoKey){
          if(car.photos){
            var otherPhotoKeys = Object.keys(car.photos)
            if(otherPhotoKeys.length > 0 && car.photos[otherPhotoKeys[0]]){
              car.keyPhoto = {
                key: Number(otherPhotoKeys[0]),
                name: car.photos[otherPhotoKeys[0]].name,
                url: car.photos[otherPhotoKeys[0]].url,
              }
            } else {
              car.keyPhoto = null;
            }
          }
        }
        this.updateCar(car.$key, car);
      })
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }


}
