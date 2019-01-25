import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationRequestService } from '../services/registration-request.service';
import { RegisteredMeterPointService } from '../services/registered-meter-point.service';
import { SupplierService as SuppliersService } from '../services/suppliers.service';
import { RegistrationRequest } from '../domain/registration-requests';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationRequestSubmission } from '../domain/registrationRequestSubmission'
import { supplier } from '../domain/supplier';
import { registeredMeterPoint } from '../domain/registered-meter-point';

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

  constructor(
    private regRequestService: RegistrationRequestService,
    private suppliersService: SuppliersService,
    private registeredMeterPointService: RegisteredMeterPointService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
  }
  dump: any;
  suppliers: supplier[];
  rmpids: registeredMeterPoint[];

  ngOnInit() {
    this.setDropDownLists();
    this.setBlankForm();
    this.setInitialValues();
  }

  setDropDownLists() {
    this.suppliersService.getSuppliers().subscribe(suppliers => {
      this.suppliers = suppliers;
      this.newrequestForm.controls.supplierid.setValue(this.suppliers[0].id);
    });

    this.registeredMeterPointService.getPoints().subscribe(rmpids => {
      this.rmpids = rmpids;
      this.newrequestForm.controls.rmpid.setValue(this.rmpids[0].id);
    });
  }

  setInitialValues() {
    this.newrequestForm.controls.switchDate.setValue(this.initDate());
  }

  initDate() {
    var utc = new Date().toJSON().slice(0, 10);
    return utc;
  }

  setBlankForm() {
    this.newrequestForm = this.formBuilder.group({
      supplierid: [],
      rmpid: [],
      switchDate: []

    });    
  }



  onSubmit(value: any) {
    let registrationRequestSubmission = value as RegistrationRequestSubmission;
    this.regRequestService.postRegistrationRequest(registrationRequestSubmission);
    this.confirmWithRediect();
  }

  confirmWithRediect() {
    window.alert("Request Submitted, returning to home page");
    this.router.navigate(['/']);
  }
}
