import { Component, OnInit } from '@angular/core';
import { RegistrationRequestService } from '../services/registration-request.service';
import { RegistrationRequest } from '../domain/registration-requests';
import { Audit } from '../domain/audit';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditService } from '../services/audit-service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  auditRequests: Audit[];
  regRequestRecord: RegistrationRequest;
  progressValue = this.progressValue;
  showMessageGreen: boolean = false;
  showMessageRed: boolean = false;
  progressBarColour = this.progressBarColour;

  constructor(private regRequestService: RegistrationRequestService, private auditService: AuditService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.auditService.getAuditRequests(params['id']).subscribe(auditRequests => {
          this.auditRequests = auditRequests;
          console.log(auditRequests);
        });
        this.regRequestService.getRegistrationRecord(params['id']).subscribe(regRequestRecord => {
          this.regRequestRecord = regRequestRecord;
          this.checkStatus(status);
        });
      });
    
  }

  checkStatus(status: string) {
    var status = this.regRequestRecord.status;
    switch (status) {
      case 'Submitted':
        this.progressValue = 10;
        this.progressBarColour = '#337ab7';
        break;
      case 'Validated':
        this.progressValue = 25;
        this.progressBarColour = '#337ab7';
        break;
      case 'Confirmed':
        this.progressValue = 50;
        this.progressBarColour = '#337ab7';
        break;
      case 'Secured':
        this.progressValue = 75;
        this.progressBarColour = '#337ab7';
        break;
      case 'Completed':
        this.progressValue = 100;
        this.progressBarColour = 'green';
        break;
      case 'Rejected':
        this.progressValue = 101;
        this.progressBarColour = 'red';
        break;
      case 'Withdrawn':
        this.progressValue = 101;
        this.progressBarColour = 'red';
        break;
      case 'Annulled':
        this.progressValue = 101;
        this.progressBarColour = 'red';
        break;
      default:
        this.progressValue = 0;
        this.progressBarColour = '#337ab7';
    }
    this.checkValue(this.progressValue);
  };

  checkValue(progressValue: number) {
    if (this.progressValue == 100) {
      this.showMessageGreen = true;
    }
    else if (this.progressValue == 101) {
      this.showMessageRed = true;
    }
    else {
      this.showMessageRed = false;
      this.showMessageGreen = false;
    }
  }

  backToHome() {
    this.router.navigate(['']);
  }


}
