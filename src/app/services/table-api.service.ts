import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Table } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableApiService {
  private apiUrl = `${environment.apiUrl}/Table`;

  constructor(private http: HttpClient) {}

  getAvailableTables(bookingStart: string, numberOfGuests: number): Observable<Table[]> {
    const params = new HttpParams()
      .set('bookingStart', bookingStart)
      .set('numberOfGuests', numberOfGuests.toString());

    return this.http.get<Table[]>(`${this.apiUrl}/GetAvailbleTables!`, { params });
  }
}