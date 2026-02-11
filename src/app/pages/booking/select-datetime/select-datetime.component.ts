import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingStoreService } from '../../../services/booking-store.service';
import { TableApiService } from '../../../services/table-api.service';
import { Table } from '../../../models/table.model';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-select-datetime',
  templateUrl: './select-datetime.component.html',
  styleUrls: ['./select-datetime.component.scss'],
  standalone: false,
})
export class SelectDatetimeComponent implements OnInit {
  form!: FormGroup;
  availableTimes: string[] = [];
  checkingAvailability = false;
  availabilityChecked = false;
  availableTablesCount = 0;
  minDate: Date;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private bookingStore: BookingStoreService,
    private tableApi: TableApiService,
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setMonth(this.maxDate.getMonth() + 3);
  }

  ngOnInit(): void {
    const existingData = this.bookingStore.getBookingData();

    this.form = this.fb.group({
      date: [existingData.date || '', Validators.required],
      time: [existingData.time || '', Validators.required],
      numberOfGuests: [
        existingData.numberOfGuests || 2,
        [Validators.required, Validators.min(1), Validators.max(8)],
      ],
    });

    this.generateAvailableTimes();

    if (existingData.date && existingData.time && existingData.numberOfGuests) {
      this.checkAvailability().subscribe();
    }

    this.form.valueChanges.subscribe(() => {
      if (this.checkingAvailability) return;
      this.availabilityChecked = false;
      this.availableTablesCount = 0;
    });
  }

  generateAvailableTimes(): void {
    this.availableTimes = [];
    for (let hour = 17; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        this.availableTimes.push(timeString);
      }
    }
  }

  markAllAsTouched(): void {
    this.form.markAllAsTouched();
  }

  checkAvailability(): Observable<boolean> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.availabilityChecked = true;
      this.availableTablesCount = 0;
      return of(false);
    }

    const { date, time, numberOfGuests } = this.form.value;
    const bookingStart = `${date}T${time}:00`;

    this.checkingAvailability = true;
    this.availabilityChecked = false;

    return this.tableApi.getAvailableTables(bookingStart, Number(numberOfGuests)).pipe(
      take(1),
      map((tables: any) => (Array.isArray(tables) ? tables : [])),
      tap((tables) => {
        console.log('Available tables:', tables);
        this.availableTablesCount = tables.length;
        
        this.availableTablesCount = tables.length;
        if (tables.length > 0) {
          this.bookingStore.updateBookingData({
            date,
            time,
            numberOfGuests: Number(numberOfGuests),
          });
        }
      }),
      map((tables) => tables.length > 0),
      catchError((err) => {
        console.error('getAvailableTables error:', err);
        this.availableTablesCount = 0;
        return of(false);
      }),

      finalize(() => {
        this.availabilityChecked = true;
        this.checkingAvailability = false;
      }),
    );
  }

  isValid(): boolean {
    return this.form.valid && this.availabilityChecked && this.availableTablesCount > 0;
  }
}
