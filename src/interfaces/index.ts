export interface User {
  id: number;
  name: string;
  lastName: string;
  password: string;
  email: string;
  age: number;
  phoneNumber: string;
}

export interface AuthState {
  users: User[];
  authenticatedUser: null | number;
}

export interface Booking {
  id: number;
  status: string;
  origin: string | null;
  destination: string | null;
  duration: string | null;
  estimatedDistance: string | null;
}

export interface BookingState {
  bookings: Booking[];
}
