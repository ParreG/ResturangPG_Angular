import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

import { BookingComponent } from './pages/booking/booking.component';
import { SelectDatetimeComponent } from './pages/booking/select-datetime/select-datetime.component';
import { ContactDetailsComponent } from './pages/booking/contact-details/contact-details.component';
import { ReviewComponent } from './pages/booking/review/review.component';
import { ConfirmationComponent } from './pages/booking/confirmation/confirmation.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './shared/error-message/error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BookingComponent,
    SelectDatetimeComponent,
    ContactDetailsComponent,
    ReviewComponent,
    ConfirmationComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
