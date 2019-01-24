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
  showMessage: boolean = false;

  constructor(private regRequestService: RegistrationRequestService, private auditService: AuditService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.auditService.getAuditRequests(params['id']).subscribe(auditRequests => {
          this.auditRequests = auditRequests;
        });
        this.regRequestService.getRegistrationRecord(params['id']).subscribe(regRequestRecord => {
          this.regRequestRecord = regRequestRecord;
          this.checkStatus(status);
          alert(this.regRequestRecord);
        });
      });
    
  }

  checkStatus(status: string) {
    var status = this.regRequestRecord.status;
    switch (status) {
      case 'Submitted':
        this.progressValue = 0;
        break;
      case 'Validated':
        this.progressValue = 25;
        break;
      case 'Confirmed':
        this.progressValue = 50;
        break;
      case 'Secured':
        this.progressValue = 75;
        break;
      case 'Completed':
        this.progressValue = 100;
        break;
      case 'Rejected':
        this.progressValue = 0;
        break;
      case 'Withdrawn':
        this.progressValue = 0;
        break;
      case 'Annulled':
        this.progressValue = 0;
        break;
      default:
        this.progressValue = 0;
    }
    this.checkValue(this.progressValue);
  };

  checkValue(progressValue: number) {
    if (this.progressValue == 100) {
      this.showMessage = true;
    }
    else {
      this.showMessage = false;
    }
  }

  backToHome() {
    this.router.navigate(['']);
  }


}
