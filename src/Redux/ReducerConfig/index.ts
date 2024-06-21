import {combineReducers} from 'redux';
import AuthenticatedSlice from './Reducers/Aunthenticated';
import BookingSlice from '../ReducerConfig/Reducers/Bookings';

export const rootReducer = combineReducers({
  AuthenticatedSlice,
  BookingSlice,
});

