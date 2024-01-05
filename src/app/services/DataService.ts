import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  data: any;

  constructor() {}

  setData(data: any) {
    this.data = data;
  }
}
