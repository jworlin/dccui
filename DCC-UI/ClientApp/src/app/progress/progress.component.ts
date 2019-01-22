import { Component, OnInit } from '@angular/core';
import { RegistrationRequestService } from '../services/registration-request.service';
import { RegistrationRequest } from '../domain/registration-requests';
import { Audit } from '../domain/audit';
import { ActivatedRoute, Router } from '@angular/router';


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

  constructor(private regRequestService: RegistrationRequestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.regRequestService.getAuditRequests(params['id']).subscribe(auditRequests => {
          this.auditRequests = auditRequests;
          console.log(this.auditRequests);
        });
        this.regRequestService.getRegistrationRecord(params['id']).subscribe(regRequestRecord => {
          this.regRequestRecord = regRequestRecord;
          console.log('id' + this.regRequestRecord);
          this.checkStatus(status);
        });
      });
    
  }

  checkStatus(status: string) {
    var status = this.regRequestRecord.status;
    switch (status) {
      case 'Rejected':
        this.progressValue = 0;
        break;
      case 'Secured':
        this.progressValue = 50;
        break;
      case 'Confirmed':
        this.progressValue = 100;
        break;
      default:
        this.progressValue = 0;
    }

   //if (this.regRequestRecord.status == 'Rejected') {
   //   alert('progress status' + this.regRequestRecord.status);
   //   this.progressValue = 0;
   // }
   // else if (this.regRequestRecord.status == 'Secured') {
   //   alert('progress status' + this.regRequestRecord.status);
   //   this.progressValue = 50;
   // }
   // else (this.regRequestRecord.status == 'Confirmed') {
   //   alert('progress status' + this.regRequestRecord.status);
   //   this.progressValue = 100;
   // }
  };


}
