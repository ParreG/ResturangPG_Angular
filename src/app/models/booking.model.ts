export interface NewBookingDTO {
  name: string;
  lastName: string;
  email: string;
  tel: string;
  numberOfGuests: number;
  bookingStart: string;
}

export interface BookingResponse {
  booking_Id: number;
  name: string;
  lastName: string;
  email: string;
  tel: string;
  numberOfGuests: number;
  bookingStart: string;
  tableNumber?: number;
}

export interface BookingFormData {
  date: string;
  time: string;
  numberOfGuests: number;
  name: string;
  lastName: string;
  email: string;
  tel: string;
}