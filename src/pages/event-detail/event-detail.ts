import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, NavParams } from 'ionic-angular';

import { Event } from '../../models/event';

import { EventUpdatePage } from '../event-update/event-update';

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  public event: Event;
  public translationParams = {
    startDate: {},
    endDate: {}
  };

  constructor(
    private _datePipe: DatePipe,
    private _navCtrl: NavController,
    private _navParams: NavParams
  ) {
    this.event = this._navParams.get('event');

    const dateFormat = 'dd.MM';
    const timeFormat = 'HH:mm';
    this.translationParams['startDate'] = {
      date: this._datePipe.transform(this.event.startDate, dateFormat),
      time: this._datePipe.transform(this.event.startDate, timeFormat),
    };
    this.translationParams['endDate'] = {
      date: this._datePipe.transform(this.event.endDate, dateFormat),
      time: this._datePipe.transform(this.event.endDate, timeFormat),
    };
  }

  public navigateToUpdatePage() {
    this._navCtrl.push(EventUpdatePage, { event: this.event });
  }

}
