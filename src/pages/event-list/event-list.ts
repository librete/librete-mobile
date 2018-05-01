import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EventsProvider } from './../../providers/events/events';

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
}
