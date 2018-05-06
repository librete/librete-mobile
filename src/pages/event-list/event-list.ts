import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EventsProvider } from './../../providers/events/events';
import { EventDetailPage } from '../event-detail/event-detail';
import { Event } from '../../models/event';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private eventsProvider: EventsProvider) {

    eventsProvider.updateEvents();
  }

  get events() {
    return this.eventsProvider.events.getValue();
  }

  public navigateToDetail(event: Event) {
    this.navCtrl.push(EventDetailPage, { event: event });
  }
}
