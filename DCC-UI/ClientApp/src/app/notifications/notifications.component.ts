import { Component, OnInit, Input } from '@angular/core';
import { Notification } from '../domain/notification';
import { NotificationService } from '../services/notifications.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notificaions: Notification[];
  constructor(private notificationService: NotificationService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('onint');
    this.route.params
      .subscribe(params => {
        this.notificationService.getNotifications(params['id']).subscribe(notifications => {
          this.notificaions = notifications;
          console.log('notifications', notifications);
        });
      });
  }

}
