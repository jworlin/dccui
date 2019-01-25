import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationRequestService } from '../services/registration-request.service';
import { RegistrationRequest } from '../domain/registration-requests';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationRequestSubmission } from '../domain/registrationRequestSubmission'

class Supplier{
  id: number;
  name: string;

  constructor(id: number, name: string) {
    Object.assign(this, { id, name });
  } 
}

class rmpid{
  id: number;
  address: string;

  constructor(id: number, address: string) {
    Object.assign(this, { id, address });
  } 
}

@Component({
  selector: 'app-newrequest',
  templateUrl: './newrequest.component.html',
  styleUrls: ['./newrequest.component.css']
})
export class NewRequestComponent implements OnInit {
  registrationRequest: RegistrationRequest;
  newrequestForm: FormGroup;

  constructor(private regRequestService: RegistrationRequestService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
  }
  suppliers: Supplier[];
  rmpids: rmpid[];

  ngOnInit() {
    this.setDropDownLists();
    this.setBlankForm();
    this.setInitialValues();
  }

  setDropDownLists() {
    let supplier1 = new Supplier(1, "EON Energy");
    let supplier2 = new Supplier(2, "Northern Gas Networks");
    this.suppliers = [supplier1, supplier2];

    let rmpid1 = new rmpid(1, "32, The Hill, Exeter");
    let rmpid2 = new rmpid(2, "Blue berry hill");
    let rmpid3 = new rmpid(3, "Place 1");
    let rmpid4 = new rmpid(4, "1 Demo Lane");
    this.rmpids = [rmpid1, rmpid2, rmpid3, rmpid4];
  }

  initDate() {
    var utc = new Date().toJSON().slice(0, 10);//.replace(/-/g, '/');


    return utc;
  }

  setBlankForm() {
    this.newrequestForm = this.formBuilder.group({
      supplierid: [],
      rmpid: [],
      switchDate: []

    });    
  }

  setInitialValues() {
    this.newrequestForm.controls.supplierid.setValue(this.suppliers[0].id);
    this.newrequestForm.controls.rmpid.setValue(this.rmpids[0].id);
    this.newrequestForm.controls.switchDate.setValue(this.initDate());
  }

  onSubmit(value: RegistrationRequestSubmission) {
    this.regRequestService.postRegistrationRequest(value);
    this.confirmWithRediect();
  }

  confirmWithRediect() {
    window.alert("Request Submitted, returning to home page");
    this.router.navigate(['/']);
  }
/*
  cancel() {
    this.router.navigate(['/']);
  }
*/
}
