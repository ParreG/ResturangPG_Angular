import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';

import { NggCoreWrapperModule } from '@sebgroup/green-angular';

import { BookingComponent } from './pages/booking/booking.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, BookingComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, NggCoreWrapperModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
