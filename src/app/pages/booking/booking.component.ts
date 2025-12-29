import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit, OnDestroy {

  ngOnInit() {
    document.body.classList.add('booking-page');
  }

  ngOnDestroy() {
    document.body.classList.remove('booking-page');
  }
}
