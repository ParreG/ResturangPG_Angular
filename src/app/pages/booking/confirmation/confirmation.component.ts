import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BookingStoreService } from '../../../services/booking-store.service';
import { BookingApiService } from '../../../services/booking-api.service';
import { BookingFormData, BookingResponse } from '../../../models/booking.model';
import { catchError, finalize, map, of, take, tap } from 'rxjs';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  standalone: false,
})
export class ConfirmationComponent implements OnInit {
  bookingId: number | null = null;
  bookingData: Partial<BookingFormData> = {};
  isLoading = false;
  error: string | null = null;
  bookingCreated = false;

  constructor(
    private bookingStore: BookingStoreService,
    private bookingApi: BookingApiService,
    private cdr: ChangeDetectorRef,
  ) {}
  
  ngOnInit(): void {
    this.bookingId = this.bookingStore.getBookingId();
    this.bookingData = this.bookingStore.getBookingData();
    if (this.bookingId) {
      this.bookingCreated = true;
      return;
    }
    this.createBooking();
  }
  createBooking(): void {
    const data = this.bookingStore.getBookingData();
    if (
      !data.date ||
      !data.time ||
      !data.numberOfGuests ||
      !data.name ||
      !data.lastName ||
      !data.email ||
      !data.tel
    ) {
      this.error = 'Saknar bokningsuppgifter. Vänligen börja om.';
      return;
    }
    const bookingDTO = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      tel: data.tel,
      numberOfGuests: data.numberOfGuests,
      bookingStart: `${data.date}T${data.time}:00`,
    };
    this.isLoading = true;
    this.error = null;
    this.bookingApi
      .createBooking(bookingDTO)
      .pipe(
        take(1),
        tap(() => {
          this.bookingCreated = true;
        }),
        map((response: any) => {
          const id = response?.booking_Id ?? response?.bookingId ?? response?.id ?? null;
          return id !== null ? Number(id) : null;
        }),
        tap((id) => {
          if (id) {
            this.bookingId = id;
            this.bookingStore.setBookingId(id);
          }
        }),
        catchError((err: any) => {
          console.error('Booking error:', err);
          this.error = err?.error?.message || 'Ett fel uppstod vid bokning. Vänligen försök igen.';
          this.bookingCreated = false;
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe();
  }

  formatDate(date: string | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
