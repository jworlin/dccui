import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  progressTitle = 'Switch Request Received';
  progressValue = 10;
  showMessage: boolean = false;
  gainingSupplierLog = 'Gaining Supplier request switch';
  gainingShipperLog = 'Gaining Shipper notified';
  losingShipperLog = 'Losing Shipper notified';
  losingSupplierLog = 'Losing Supplier notified';
  public forecasts: WeatherForecast[];

  setValue(progressValue: number, progressTitle: string): void {
    this.progressValue = 100;
    this.progressTitle = "Status has changed";
    this.gainingSupplierLog = 'Supplier Switch complete'
  }

  checkValue(progressValue: number) {
    if (this.progressValue == 100) {
      this.showMessage = true;
    }
    else {
      this.showMessage = false;
    }
  }

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

