import { Component, OnInit, ViewChildren } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { EventService } from '../shared/event.service';

import { EventModel } from '../shared/event.model';

import * as fromRoot from '../store/reducers';
import * as appActions from '../store/actions/app.actions';
import { CollapseComponent } from 'angular-bootstrap-md';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  event: EventModel;
  url: string;
  ticketCount: number;
  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];

  constructor(private eventService: EventService, private route: ActivatedRoute, private store: Store<fromRoot.State>, private router: Router) {}

  ngOnInit() {
    this.url = (this.route.params as Params).value.url;
    this.eventService.fetchEvent(this.url).subscribe(data => {
      this.eventService.eventData = data;
      this.event = data;
      for (const key in this.event.ticket_types) {
        if (this.event.ticket_types[key]) {
          this.event.ticket_types[key].amountSelected = 0;
        }
        // if (result.ticket) {
        //   let found = result.ticket.find(item => {
        //     return item.name == this.event.ticket_types[key].name;
        //   });
        //   if (found) {
        //     this.event.ticket_types[key].amountSelected = found.count;
        //   }
        // }
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.collapses.forEach((collapse: CollapseComponent) => {
        collapse.toggle();
      });
    }, 1000);
  }

  onCheckout(form: NgForm) {
    const tmpData = this.convertObjToArray(form.value);
    this.store.dispatch(new appActions.SetEvent(this.event));
    this.store.dispatch(new appActions.SetTicket(tmpData));
    this.router.navigate(['/event', this.url, 'checkout']);
  }

  createTicketRange(num: number) {
    const newArr = [];
    for (let i = 1; i <= num; i++) {
      newArr.push(i);
    }
    return newArr;
  }

  isValidTicket() {
    this.ticketCount = 0;
    for (const key in this.event.ticket_types) {
      if (this.event.ticket_types[key]) {
        const value = this.event.ticket_types[key];
        const num = parseInt(value.amountSelected, 0);
        if (num) {
          this.ticketCount += num;
        }
      }
    }
    return this.ticketCount;
  }

  convertObjToArray(obj) {
    const result = [];
    for (const key in obj) {
      if (parseInt(obj[key])) {
        result.push({
          name: key,
          count: parseInt(obj[key])
        });
      }
    }
    return result;
  }
}
