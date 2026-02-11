import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BookingStoreService } from '../../services/booking-store.service';
import { SelectDatetimeComponent } from './select-datetime/select-datetime.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  standalone: false,
})
export class BookingComponent implements OnInit, OnDestroy {
  step = 1;
  maxStepReached = 1;
  isNextBusy = false;

  @ViewChild(SelectDatetimeComponent) selectDatetime?: SelectDatetimeComponent;
  @ViewChild(ContactDetailsComponent) contactDetails?: ContactDetailsComponent;

  constructor(
    private bookingStore: BookingStoreService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    document.body.classList.add('booking-page');
  }

  ngOnDestroy() {
    document.body.classList.remove('booking-page');
  }

  canProceedFromStep(currentStep: number): boolean {
    switch (currentStep) {
      case 1:
        return this.selectDatetime?.isValid() || false;
      case 2:
        return this.contactDetails?.isValid() || false;
      case 3:
        return true;
      default:
        return false;
    }
  }

  next() {
    if (this.step === 1) {
      if (!this.selectDatetime) return;
      if (this.selectDatetime.isValid()) {
        this.step++;
        this.maxStepReached = Math.max(this.maxStepReached, this.step);
        return;
      }

      this.isNextBusy = true;

      this.selectDatetime.checkAvailability().subscribe({
        next: (ok) => {
          console.log('checkAvailability result:', ok);
          this.isNextBusy = false;
          if (ok) {
            this.step++;
            this.maxStepReached = Math.max(this.maxStepReached, this.step);
          }
          setTimeout(() => this.cdr.detectChanges());
        },
        error: (err) => {
          console.error('checkAvailability error in next():', err);
          this.isNextBusy = false;
          setTimeout(() => this.cdr.detectChanges());
        },
      });

      return;
    }

    if (this.step < 4 && this.canProceedFromStep(this.step)) {
      this.step++;
      this.maxStepReached = Math.max(this.maxStepReached, this.step);
    }
  }

  prev() {
    if (this.step > 1) {
      this.step--;
    }
  }

  goToStep(target: number) {
    if (target <= this.maxStepReached) {
      this.step = target;
    }
  }

  resetBooking() {
    this.step = 1;
    this.maxStepReached = 1;
    this.bookingStore.resetBooking();
  }
}
