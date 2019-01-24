import { Component, OnInit } from '@angular/core';
import { Intervention } from './intervention';
import { ActivatedRoute, Router } from '@angular/router';
import { InterventionService } from './intervention.service';
import { RegistrationRequestService } from '../services/registration-request.service';
import { RegistrationRequest } from '../domain/registration-requests';

@Component({
  selector: 'intervention-request',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {
    regRequestRecord: RegistrationRequest;
  private intervention: Intervention;
  private message: string;
  constructor(private route: ActivatedRoute, private router: Router, private interventionService: InterventionService, private regRequestService: RegistrationRequestService) {
      this.intervention = new Intervention();
   }

  options = ['objection','no objection'];
  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.regRequestService.getRegistrationRecord(params['id']).subscribe(regRequestRecord => {
          this.regRequestRecord = regRequestRecord;
          this.intervention.RegistrationRequestId = this.regRequestRecord.id;
        });
      });
  }

  SubmitForm() {
    this.message = "Intervention in progress";
    this.interventionService.intervene(this.intervention).subscribe(res => {
      this.message = "Intervention complete";
    });
  }
}
