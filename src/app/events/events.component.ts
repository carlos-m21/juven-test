import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: any;
  headElements = ['NAME', 'DATE', 'LOCATION'];
  @ViewChild('basicModal') modal;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getAllEvents().subscribe(data => {
      this.events = data;
      if (!this.events.length) {
        this.initData();
      }
    });
  }

  initData() {
    this.eventService.initData().subscribe(result => {
      if (result) {
        this.modal.show();
      }
    });
  }

  closeModal() {
    this.modal.hide();
    this.getEvents();
  }
}
