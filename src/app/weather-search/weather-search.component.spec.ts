import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSearchComponent } from './weather-search.component';
import { GrowlModule } from 'primeng/components/growl/growl';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { WeatherService } from '../services/weather.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

class WeatherServiceSpy {
  testForcat = {
    'cityId': 2643743, 'city': 'London, GB',
    'country': 'GB', 'temp_1200AM': '0.35 C',
    'temp_0300AM': '-0.21 C', 'temp_0600AM': '-0.4 C',
    'temp_0900AM': '-0.15 C', 'temp_1200PM': '1.53 C',
    'temp_0300PM': '1.69 C', 'temp_0600PM': '-0.38 C',
    'temp_0900PM': '-3.87 C'
  };

  getWeather = jasmine.createSpy('getWeather').and.callFake(
    () => Promise
      .resolve(true)
      .then(() => Object.assign({}, this.testForcat))
  );
}

describe('WeatherSearchComponent', () => {
  let component: WeatherSearchComponent;
  let fixture: ComponentFixture<WeatherSearchComponent>;
  let weatherSpy: WeatherServiceSpy;
  let deSearchButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherSearchComponent],
      imports: [GrowlModule, FormsModule, DataTableModule, ButtonModule, InputTextModule],
      providers: [
        { provide: WeatherService, useClass: WeatherServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSearchComponent);
    component = fixture.componentInstance;
    deSearchButton = fixture.debugElement.query(By.css('#btnSearch'));
    // get the component's injected WeatherService
    weatherSpy = fixture.debugElement.injector.get(WeatherService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should have called `getHero`', () => {
    expect(weatherSpy.getWeather.calls.count()).toBe(1, 'getWeather called once');
  });*/

  it('should call getWeather when search clicked', () => {
    component.cityName = 'London,gb';
    fixture.detectChanges();
    deSearchButton.triggerEventHandler('click', null);
    expect(weatherSpy.getWeather.calls.count()).toBe(1, 'getWeather called once');
  });

  it('should not call getWeather when cityName is empty', () => {
    component.cityName = '';
    fixture.detectChanges();
    deSearchButton.triggerEventHandler('click', null);
    expect(weatherSpy.getWeather.calls.count()).toBe(0, 'getWeather not called');
  });

});
