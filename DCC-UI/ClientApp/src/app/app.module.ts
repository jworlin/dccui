import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistrationRequestService } from './services/registration-request.service';
import { AuditService } from './services/audit-service';
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { ProgressComponent } from "./progress/progress.component";
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationService } from './services/notifications.service';
import { InterventionComponent } from "./intervene/intervention.component";
import { InterventionService } from "./intervene/intervention.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    NavMenuComponent,
    ProgressComponent,
    NotificationsComponent,
    ProgressComponent,
    InterventionComponent
  ],
  imports: [HttpModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'intervention/:id', component: InterventionComponent }
    ]),
    RouterModule.forChild([
      { path: 'app-progress/:id', component: ProgressComponent }
    ])
  ],
    providers: [RegistrationRequestService, AuditService, InterventionService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
