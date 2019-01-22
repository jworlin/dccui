import { Component, OnInit } from '@angular/core';
import { RegistrationRequestService } from '../services/registration-request.service';
import { RegistrationRequest } from '../domain/registration-requests';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registrationRequests: RegistrationRequest[];

  constructor(private regRequestService: RegistrationRequestService){}

  ngOnInit(){
    this.regRequestService.getRegistrationRequests().subscribe(regRequests => {
      this.registrationRequests = regRequests;
      console.log(this.registrationRequests);
      });
  }
}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
