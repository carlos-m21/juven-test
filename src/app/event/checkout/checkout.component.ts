import { Component, OnInit, ViewChild } from '@angular/core';
import { EventModel } from '../../shared/event.model';
import { EventService } from '../../shared/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import * as fromRoot from '../../store/reducers';
import * as appActions from '../../store/actions/app.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  event: any;
  ticket: any;
  url: any;
  eventSubscription: Subscription;
  checkoutData: any;
  @ViewChild('basicModal') modal;

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    console.log('chyeckout');
    this.url = this.route.params;
    this.store.select('app').subscribe(result => {
      if (result && result.ticket) {
        this.event = result.event;
        this.ticket = result.ticket;
        // if (!this.ticket) {
        //   this.onGoBack();
        // }
      }
    });
  }

  onConfirm(form: NgForm) {
    this.eventService.checkout(form.value).subscribe(result => {
      this.checkoutData = result;

      this.modal.show();
    });
  }

  onGoBack() {
    this.store.dispatch(new appActions.RemoveEvent());
    this.store.dispatch(new appActions.RemoveTicket());
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
