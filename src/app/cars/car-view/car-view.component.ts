import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { CarService } from '../shared/car.service';
import { Car } from '../shared/car';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.scss']
})
export class CarViewComponent implements OnInit {

  car: Car;
  carid: string;
  userid: string;
  isValidCar: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private db: AngularFireDatabase,) { }

  ngOnInit() {
    console.log('init in view');
    this.route.paramMap.subscribe(params => {
      this.carid = params.get('car_id');
      this.userid = params.get('user_id');
      console.log(this.carid, this.userid);
      this.getCar(this.userid, this.carid).subscribe((snapshot) => {
        this.car = snapshot
        console.log(snapshot);
      })
    });
  }

  getCar(userKey: string, carkey: string): FirebaseObjectObservable<Car> {
    const carPath = `cars/${userKey}/${carkey}`;
    return this.db.object(carPath)
  }

  iterablePhotos() {
    if(!this.car.photos){
      return [];
    }
    return Object.keys(this.car.photos);
  }

}
