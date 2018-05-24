import { Component } from '@angular/core';
import { AlertController, ItemSliding, NavController } from 'ionic-angular';

import { Event } from '../../models/event';

import { EventDetailPage } from '../event-detail/event-detail';
import { EventCreatePage } from '../event-create/event-create';
import { EventUpdatePage } from '../event-update/event-update';

import { EventsProvider } from '../../providers/events/events';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  constructor(
    private _alertCtrl: AlertController,
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

  public navigateToUpdatePage(event: Event, item: ItemSliding) {
    this._navCtrl.push(EventUpdatePage, { event: event });
    item.close();
  }

  public deleteEvent(event) {
    const confirm = this._alertCtrl.create({
      title: 'Are you sure?',
      message: `Are you sure that you want to delete "${event.name}"`,
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this._eventsProvider.deleteEvent(event.url);
          }
        }
      ]
    });
    confirm.present();
  }

}
