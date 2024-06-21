import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BookingState, Booking} from '../../../../interfaces';

const initialState: BookingState = {
  bookings: [],
};

const BookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    createBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    setStatusBookings: (state, action: PayloadAction<number>) => {
      const booking = state.bookings.find(data => data.id === action.payload);
      if (booking) {
        booking.status = 'confirmed';
      }
    },
  },
});

export const {createBooking, setStatusBookings} = BookingSlice.actions;
export default BookingSlice.reducer;
