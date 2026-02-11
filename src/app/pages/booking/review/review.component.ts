import { Component, OnInit } from '@angular/core';
import { BookingStoreService } from '../../../services/booking-store.service';
import { BookingFormData } from '../../../models/booking.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  standalone: false
})
export class ReviewComponent implements OnInit {
  bookingData: Partial<BookingFormData> = {};

  constructor(private bookingStore: BookingStoreService) {}

  ngOnInit(): void {
    this.bookingData = this.bookingStore.getBookingData();
  }

  formatDate(date: string | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('sv-SE', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}