import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

@Injectable()
export class WeatherService {
  apiUrl = 'http://api.openweathermap.org/data/2.5/forecast';
  apiKey = '8e1e05325f57fc8351b39e8000205b07';

  constructor(private http: HttpClient) {

  }

  getWeather(city: string, days: number): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url)
      .map((data) => this.processData(data, days));
  }

  private processData(data: any, days: number) {
    const resp = {};
    resp['cityId'] = data.city.id;
    resp['city'] = `${data.city.name}, ${data.city.country}`;
    resp['country'] = data.city.country;

    data.list.slice(0, days * 8)
      .forEach((forcast) => {
        resp['temp_' + moment.unix(forcast.dt).format('hhmmA')] = forcast.main.temp + ' C';
      });
    return resp;
  }

}
