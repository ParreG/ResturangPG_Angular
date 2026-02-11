import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookingFormData } from '../models/booking.model';

@Injectable({providedIn: 'root'})
export class BookingStoreService {
  private bookingDataSubject = new BehaviorSubject<Partial<BookingFormData>>({});
  public bookingData$: Observable<Partial<BookingFormData>> = this.bookingDataSubject.asObservable();

  private bookingIdSubject = new BehaviorSubject<number | null>(null);
  public bookingId$: Observable<number | null> = this.bookingIdSubject.asObservable();

  getBookingData(): Partial<BookingFormData> {
    return this.bookingDataSubject.value;
  }

  updateBookingData(data: Partial<BookingFormData>): void {
    const currentData = this.bookingDataSubject.value;
    this.bookingDataSubject.next({ ...currentData, ...data });
  }

  setBookingId(id: number): void {
    this.bookingIdSubject.next(id);
  }

  getBookingId(): number | null {
    return this.bookingIdSubject.value;
  }

  resetBooking(): void {
    this.bookingDataSubject.next({});
    this.bookingIdSubject.next(null);
  }
}