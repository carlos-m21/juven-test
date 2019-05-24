import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutComponent } from './event/checkout/checkout.component';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  { path: '', component: EventsComponent },
  {
    path: 'event/:url',
    component: EventComponent
    // children: [
    //   {
    //     path: 'checkout',
    //     component: CheckoutComponent
    //   }
    //   {
    //     path: '',
    //     component: TicketingComponent
    //   }
    // ]
  },
  { path: 'event/:url/checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
