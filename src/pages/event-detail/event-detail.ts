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
    endDate: {},
    createdAt: {},
    updatedAt: {}
  };

  constructor(
    private _datePipe: DatePipe,
    private _navCtrl: NavController,
    private _navParams: NavParams
  ) {
    this.event = this._navParams.get('event');

    this.translationParams.startDate = this._formatDate(this.event.startDate);
    this.translationParams.endDate = this._formatDate(this.event.endDate);
    this.translationParams.createdAt = this._formatDate(this.event.createdAt);
    this.translationParams.updatedAt = this._formatDate(this.event.updatedAt);
  }

  public navigateToUpdatePage() {
    this._navCtrl.push(EventUpdatePage, { event: this.event });
  }

  private _formatDate(date: Date): object {
    const dateFormat = 'dd.MM';
    const timeFormat = 'HH:mm';

    return {
      date: this._datePipe.transform(date, dateFormat),
      time: this._datePipe.transform(date, timeFormat),
    };
  }

}
