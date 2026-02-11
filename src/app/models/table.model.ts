export interface Table {
  table_Id: number;
  number: number;
  capacity: number;
  x: number;
  y: number;
}

export interface AvailableTablesRequest {
  bookingStart: string;
  numberOfGuests: number;
}