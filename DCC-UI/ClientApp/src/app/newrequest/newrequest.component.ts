import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationRequestService } from '../services/registration-request.service';
import { RegistrationRequest } from '../domain/registration-requests';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationRequestSubmission } from '../domain/registrationRequestSubmission'

@Component({
  selector: 'app-newrequest',
  templateUrl: './newrequest.component.html',
  styleUrls: ['./newrequest.component.css']
})
export class NewRequestComponent implements OnInit {
  registrationRequest: RegistrationRequest;
  newrequestForm: FormGroup;

  constructor(private regRequestService: RegistrationRequestService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setBlankForm();
    this.setInitialValues();
  }

  setBlankForm() {
    this.newrequestForm = this.formBuilder.group({
      supplier: [''],
      rmpid: [''],
      switchDate: ['', [Validators.required]]
    });    
  }

  setInitialValues() {
    this.newrequestForm.controls.supplier.setValue('1');
    this.newrequestForm.controls.rmpid.setValue('1');
  }

  onSubmit(value: RegistrationRequestSubmission) {
    this.regRequestService.postRegistrationRequest(value);    
  }
}
