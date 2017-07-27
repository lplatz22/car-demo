import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { CarService } from '../shared/car.service';
import { Car } from '../shared/car';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'car-sample',
  templateUrl: './car-sample.component.html',
  styleUrls: ['./car-sample.component.scss']
})
export class CarSampleComponent implements OnInit {

  car: Car;
  carid: string;
  userid: string;
  iframe_text: string;

  constructor(private route: ActivatedRoute, private router: Router, private carService: CarService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.carid = params.get('car_id');
      this.userid = params.get('user_id');
      this.carService.getCar(this.userid, this.carid).subscribe((snapshot) => {
        this.car = snapshot;
        this.makeIframeText();
      })
    });
  }

  makeIframeText(){
    this.iframe_text = `<iframe style='border: 2px solid black; width: 600px; height: 500px;' src='http://localhost:4200/view/${this.userid}/${this.carid}'></iframe>`
  }

  iterablePhotos() {
    // if(!this.car.photos){
    //   return [];
    // }
    // return Object.keys(this.car.photos);
  }

}
