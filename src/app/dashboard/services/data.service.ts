import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getData() {
    return this.http.get('assets/data/dummy.json')
      .map(response => response.json());
  }
}
