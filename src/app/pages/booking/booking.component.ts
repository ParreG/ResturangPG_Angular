import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit, OnDestroy {
  step = 1;
  maxStepReached = 1;
  // Sen: FormGroup här
  // form = this.fb.group({ ... });

  ngOnInit() {
    document.body.classList.add('booking-page');
  }

  ngOnDestroy() {
    document.body.classList.remove('booking-page');
  }

  next() {
    if (this.step < 4) {
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
    // this.form.reset();
  }
}
