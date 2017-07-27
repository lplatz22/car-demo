export class Car {
  $key: string;
  make: string;
  model: string;
  vin: string;
  description: string;
  keyPhoto: {
    key: number,
    name: string,
    url: string
  };
  photos: {};
  createdTimestamp: Date;
  modifiedTimestamp: Date;
}
