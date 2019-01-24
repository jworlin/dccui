import { Component, OnInit } from '@angular/core';
import { Intervention } from './intervention';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'intervention-request',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {
  
    private intervention: Intervention;
  constructor(private route: ActivatedRoute, private router: Router) {
      this.intervention = new Intervention();
   }

  ngOnInit() {
  }

  submitRequest(id: string) {

  }
}
