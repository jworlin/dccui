import { Component, OnInit } from '@angular/core';
import { Intervention } from './intervention';
import { ActivatedRoute, Router } from '@angular/router';
import { InterventionService } from './intervention.service';

@Component({
  selector: 'intervention-request',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {
  
    private intervention: Intervention;
  constructor(private route: ActivatedRoute, private router: Router, private interventionService: InterventionService) {
      this.intervention = new Intervention();
   }

  ngOnInit() {
  }

  SubmitForm() {
    this.interventionService.intervene(this.intervention).subscribe(res => {
    });
  }
}
