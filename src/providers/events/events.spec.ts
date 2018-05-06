import { TestBed, inject } from '@angular/core/testing';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { CommonProvider } from './../common/common';
import { EventsProvider } from './events';
import { Event } from './../../models/event';

const getEventsResponse = {
  'results': [
    {
      'url': 'https://example.com/api/events/1/',
      'name': 'Event name',
      'author': 'https://example.com/api/authors/1/',
      'category': 'https://example.com/api/categories/1/',
      'start_date': '2018-04-02T01:00:00Z',
      'end_date': '2018-04-20T01:00:00Z',
      'created_at': '2018-04-01T06:23:05.288858Z',
      'updated_at': '2018-04-01T06:23:05.288906Z',
      'location': 'Location',
      'description': 'Description'
    },
    {
      'url': 'https://example.com/api/events/2/',
      'name': 'Event name 2',
      'author': 'https://example.com/api/authors/1/',
      'category': 'https://example.com/api/categories/1/',
      'start_date': '2018-04-02T04:00:00Z',
      'end_date': '2018-04-20T04:00:00Z',
      'created_at': '2018-04-01T06:26:01.288858Z',
      'updated_at': '2018-04-01T06:26:01.288858Z',
      'location': 'Location',
      'description': 'Description'
    }
  ]
};

class CommonProviderStub {

  public performRequest(relativeUrl: string,
    requestMethod: string,
    requestData?: object | HttpParams): Observable<Object> {
    return Observable.of(getEventsResponse);
  }
}

describe('Providers: EventsProvider', () => {
  let provider;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EventsProvider,
      { provide: CommonProvider, useClass: CommonProviderStub },
    ]
  }));

  beforeEach(inject([EventsProvider], eventsProvider => {
    provider = eventsProvider;
  }));


  it('Should update events', (done) => {

    provider.updateEvents().then(
      data => {
        const events = provider.events.getValue();
        expect(events.length).toBe(getEventsResponse.results.length);
        for (const event of events) {
          expect(event).toEqual(jasmine.any(Event));
        }
        done();
      }
    );

  });

});
