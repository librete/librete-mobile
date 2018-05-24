import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Event } from '../../models/event';

import { EventDetailPage } from '../event-detail/event-detail';
import { EventCreatePage } from '../event-create/event-create';

import { EventsProvider } from '../../providers/events/events';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  constructor(
    private _navCtrl: NavController,
    private _eventsProvider: EventsProvider
  ) {
    _eventsProvider.readEvents();
  }

  public get events() {
    return this._eventsProvider.events.getValue();
  }

  public navigateToDetailPage(event: Event) {
    this._navCtrl.push(EventDetailPage, { event: event });
  }

  public navigateToCreatePage() {
    this._navCtrl.push(EventCreatePage);
  }

}
