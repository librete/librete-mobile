import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EventUpdatePage } from '../event-update/event-update';
import { Event } from '../../models/event';

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  public event: Event;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.get('event');
  }

  public navigateToEventUpdatePage() {
    this.navCtrl.push(EventUpdatePage, { event: this.event });
  }

}
