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

  public createEvent(data: any) {
    return new Promise ((resolve, reject) => {
      data.start_date = new Date(data.startDate);
      data.end_date = new Date(data.endDate);
      this.commonProvider.performRequest('events/', 'POST', data).subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const event: Event = jsonConvert.deserialize(data, Event);
          const events: Array<Event> = this._events.getValue();
          this.setCategory(event);
          events.push(event);
          resolve(event);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  public updateEvents(): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      this.getEvents().subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const events: Array<Event> = jsonConvert.deserializeArray(data.results, Event);
          for (const event of events) {
            this.setCategory(event);
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

  private setCategory(event) {
    event.category = this.categoriesProvider.categories.getValue().filter(
      category => category.url === event.categoryUrl
    )[0];
  }
}
