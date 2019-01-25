import { Component, OnInit } from '@angular/core';
import { RegistrationRequestService } from '../services/registration-request.service';
import { RegistrationRequest } from '../domain/registration-requests';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registrationRequests: RegistrationRequest[];

  constructor(private regRequestService: RegistrationRequestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.regRequestService.getRegistrationRequests().subscribe(regRequests => {
      this.registrationRequests = regRequests;
      console.log(this.registrationRequests);
    });
  }

  newRequest() {
    this.router.navigate(['app-newrequest/']);
  }

  showRequest(id: string) {
    this.router.navigate(['app-progress/' + id]);
  }
}

