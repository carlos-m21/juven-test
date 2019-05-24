import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

import { EventModel } from './event.model';

@Injectable()
export class EventService {
  eventData: EventModel;
  eventDataChanged = new Subject<any>();
  constructor(private http: HttpClient) {}

  initData() {
    return this.http.post(`${environment.backendApi}/event/saveInitTickets`, {});
  }

  getAllEvents() {
    return this.http.get(`${environment.backendApi}/event/all`);
  }

  fetchEvent(url: string) {
    return this.http.get<EventModel>(`${environment.backendApi}/event/${url}`);
  }

  getEvent() {
    return this.eventData;
  }

  checkout(form) {
    return this.http.post(`${environment.backendApi}/event/ticketCheckout`, form);
  }
}
