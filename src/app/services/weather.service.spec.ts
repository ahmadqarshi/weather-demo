import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let injector: TestBed;
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherService],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    service = injector.get(WeatherService);
    httpMock = injector.get(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([WeatherService], (weatherService: WeatherService) => {
    expect(weatherService).toBeTruthy();
  }));

  describe('#getWeather', () => {
    it('should return an Observable<any>', () => {

      const backEndResp = {
        'city': {
          'id': 1851632, 'name': 'Shuzenji',
          'coord': { 'lon': 138.933334, 'lat': 34.966671 },
          'country': 'JP'
        },
        'cod': '200',
        'message': 0.0045,
        'cnt': 38,
        'list': [{
          'dt': 1487246400,
          'main': {
            'temp': 298.77
          }
        },
        {
          'dt': 1487257200,
          'main': {
            'temp': 298.77
          }
        },
        {
          'dt': 1487268000,
          'main': {
            'temp': 298.77
          }
        },
        {
          'dt': 1487278800,
          'main': {
            'temp': 298.77
          }
        },
        {
          'dt': 1487289600,
          'main': {
            'temp': 298.77
          }
        },
        {
          'dt': 1487300400,
          'main': {
            'temp': 298.77
          }
        },
        {
          'dt': 1487311200,
          'main': {
            'temp': 298.77
          }
        }, {
          'dt': 1487322000,
          'main': {
            'temp': 298.77
          }
        }, {
          'dt': 1487332800,
          'main': {
            'temp': 298.77
          }
        }
        ]
      };

      const testForcat = {
        'cityId': 1851632, 'city': 'Shuzenji, JP', 'country': 'JP',
        'temp_1200PM': '298.77 C', 'temp_0300PM': '298.77 C',
        'temp_0600PM': '298.77 C', 'temp_0900PM': '298.77 C',
        'temp_1200AM': '298.77 C', 'temp_0300AM': '298.77 C',
        'temp_0600AM': '298.77 C', 'temp_0900AM': '298.77 C'
      };

      const cityName = 'Shuzenji,JP';

      service.getWeather(cityName, 1).subscribe(data => {
        expect(data).toBeDefined();
        expect(data).toEqual(testForcat);
      });

      const req = httpMock.expectOne(`${service.apiUrl}?q=${cityName}&appid=${service.apiKey}&units=metric`);
      expect(req.request.method).toBe('GET');
      // provide dummy forcat values as response
      req.flush(backEndResp);
    });
  });
});
