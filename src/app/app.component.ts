import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import * as appActions from './store/actions/app.actions';

import * as fromRoot from './store/reducers';
import { Store } from '@ngrx/store';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'juven-coding-test';
  urlValue: string;
  @ViewChild('basicModal') modal;

  constructor(private router: Router, private store: Store<fromRoot.State>, private localStorage: LocalStorage) {}

  ngOnInit() {
    this.localStorage.getItem('ticket').subscribe(ticketData => {
      if (Array.isArray(ticketData) && ticketData.length) {
        this.modal.show();
        this.localStorage.getItem('event').subscribe(eventData => {
          if (eventData) {
            this.urlValue = eventData.url;
            this.store.dispatch(new appActions.SetEvent(eventData));
            this.store.dispatch(new appActions.SetTicket(ticketData));
          }
        });
      }
    });
  }

  gotoCheckout() {
    this.router.navigate([`/event${this.urlValue}`, 'checkout']);
    this.modal.hide();
  }
}
