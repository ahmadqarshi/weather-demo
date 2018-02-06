import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { WeatherService } from '../services/weather.service';


@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css'],
  providers: [MessageService]
})
export class WeatherSearchComponent implements OnInit {
  emptyTableMsg = 'No weather forcast data found.';
  msgs: Message[] = [];
  forcastData = [
  ];
  cityName = '';
  columns = [
    { header: '03:00 AM', field: 'temp_0300AM' },
    { header: '06:00 AM', field: 'temp_0600AM' },
    { header: '09:00 AM', field: 'temp_0900AM' },
    { header: '12:00 PM', field: 'temp_1200PM' },
    { header: '03:00 PM', field: 'temp_0300PM' },
    { header: '06:00 PM', field: 'temp_0600PM' },
    { header: '09:00 PM', field: 'temp_0900PM' },
    { header: '12:00 AM', field: 'temp_1200AM' }
  ];

  constructor(
    private weatherService: WeatherService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.createColumns();
  }

  private createColumns() {
    const currentTime = new Date();
    const nextQuarterHourIndex = Math.floor(currentTime.getHours() / 3);

    this.columns = [...this.columns.slice(nextQuarterHourIndex), ...this.columns.slice(0, nextQuarterHourIndex)];
  }

  searchForCity($event) {
    if (this.cityName === '') {
      this.showError('Please enter a city name along with country code');
      return;
    }

    this.weatherService.getWeather(this.cityName, 1).subscribe(
      (data) => {
        let indx = -1;
        const foundData = this.forcastData.find((value, index) => {
          if (value.cityId === data.cityId) {
            indx = index;
            return true;
          } else {
            return false;
          }
        });

        if (foundData === undefined) {
          // record does not exist.
          this.forcastData.push(data);
        } else {
          // already exists, update it.
          this.forcastData[indx] = data;
        }
      },
      (error) => {
        console.log(error);
        this.showError('Failed to fetch the weather information');
      }
    );

  }

  showError(message) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
