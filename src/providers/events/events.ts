import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { JsonConvert } from 'json2typescript';

import { CommonProvider } from '../common/common';
import { CategoriesProvider } from '../categories/categories';
import { Event } from '../../models/event';

@Injectable()
export class EventsProvider {
  private _events = new BehaviorSubject<Array<Event>>([]);

  constructor(
    private _commonProvider: CommonProvider,
    private _categoriesProvider: CategoriesProvider
  ) { }

  public get events() {
    return this._events;
  }

  public readEvents(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._commonProvider.performRequest('events/', 'GET').subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const events: Array<Event> = jsonConvert.deserializeArray(data.results, Event);
          for (const event of events) {
            this._setCategory(event);
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

  public createEvent(data: any) {
    return new Promise((resolve, reject) => {
      data.start_date = new Date(data.startDate);
      data.end_date = new Date(data.endDate);
      this._commonProvider.performRequest('events/', 'POST', data).subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const event: Event = jsonConvert.deserialize(data, Event);
          const events: Array<Event> = this._events.getValue();
          this._setCategory(event);
          events.push(event);
          resolve(event);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  public updateEvent(url: string, data: any) {
    return new Promise((resolve, reject) => {
      data.start_date = new Date(data.startDate);
      data.end_date = new Date(data.endDate);
      this._commonProvider.performRequest(url, 'PUT', data).subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const event: Event = jsonConvert.deserialize(data, Event);
          const events: Array<Event> = this._events.getValue();
          const index = events.findIndex(x => x.url === url);

          this._setCategory(event);
          events[index] = Object.assign(events[index], event);

          resolve(event);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  public deleteEvent(url: string) {
    return new Promise((resolve, reject) => {
      this._commonProvider.performRequest(url, 'DELETE').subscribe(
        (data: any) => {
          const events: Array<Event> = this._events.getValue();
          const index = events.findIndex(x => x.url === url);
          events.splice(index, 1);
          resolve();
        },
        error => {
          reject(error);
        }
      );
    });
  }

  private _setCategory(event) {
    event.category = this._categoriesProvider.categories.getValue().find(
      category => category.url === event.categoryUrl
    );
  }

}
