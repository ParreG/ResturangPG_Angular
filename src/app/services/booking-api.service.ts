import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { NewBookingDTO, BookingResponse } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {
  private apiUrl = `${environment.apiUrl}/Booking`;

  constructor(private http: HttpClient) {}

  createBooking(booking: NewBookingDTO): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${this.apiUrl}/AddNewBooking`, booking);
  }

  getBookingById(id: number): Observable<BookingResponse> {
    return this.http.get<BookingResponse>(`${this.apiUrl}/GetBookingById/${id}`);
  }
}