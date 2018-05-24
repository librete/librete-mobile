import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Event } from '../../models/event';

import { EventUpdatePage } from '../event-update/event-update';

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  public event: Event;

  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams
  ) {
    this.event = this._navParams.get('event');
  }

  public navigateToUpdatePage() {
    this._navCtrl.push(EventUpdatePage, { event: this.event });
  }

}
