import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingStoreService } from '../../../services/booking-store.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  standalone: false
})
export class ContactDetailsComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookingStore: BookingStoreService
  ) {}

  ngOnInit(): void {
    const existingData = this.bookingStore.getBookingData();

    this.form = this.fb.group({
      name: [existingData.name || '', [Validators.required, Validators.maxLength(50)]],
      lastName: [existingData.lastName || '', [Validators.required, Validators.maxLength(50)]],
      email: [existingData.email || '', [Validators.required, Validators.email, Validators.maxLength(254)]],
      tel: [existingData.tel || '', [Validators.required, Validators.maxLength(30)]]
    });

    this.form.valueChanges.subscribe(values => {
      if (this.form.valid) {
        this.bookingStore.updateBookingData(values);
      }
    });
  }

  isValid(): boolean {
    return this.form.valid;
  }
}