import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { JsonConvert } from 'json2typescript';

import { CommonProvider } from './../common/common';
import { Event } from './../../models/event';

@Injectable()
export class EventsProvider {
  private _events = new BehaviorSubject<Array<Event>>([]);

  constructor(private commonProvider: CommonProvider) {
  }

  get events() {
    return this._events;
  }

  public updateEvents(): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      this.getEvents().subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          this._events.next(jsonConvert.deserializeArray(data.results, Event));
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
