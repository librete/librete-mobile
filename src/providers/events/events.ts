import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { JsonConvert } from 'json2typescript';

import { CommonProvider } from './../common/common';
import { CategoriesProvider } from './../categories/categories';
import { Event } from './../../models/event';

@Injectable()
export class EventsProvider {
  private _events = new BehaviorSubject<Array<Event>>([]);

  constructor(private commonProvider: CommonProvider,
    private categoriesProvider: CategoriesProvider) {
  }

  get events() {
    return this._events;
  }

  public updateEvents(): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      this.getEvents().subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const events: Array<Event> = jsonConvert.deserializeArray(data.results, Event);
          for (const event of events) {
            event.category = this.categoriesProvider.categories.getValue().filter(
              category => category.url === event.categoryUrl
            )[0];
          }
          this._events.next(events);
          resolve();
        },
        error => {
          reject();
        }
      );
    });
  }

  private getEvents() {
    return this.commonProvider.performRequest('events/', 'GET');
  }

}
