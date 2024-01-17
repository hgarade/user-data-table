import { createAction, props } from '@ngrx/store';
import { User } from '../type/user.types';

export const GET_DATA = '[Get Data] Get user data from API';
export const LOAD_DATA = '[Load Data] Load user data to store';
export const UPDATE_DATA = '[Update Data] Update user data to store';

export const getUserDataAction = createAction(GET_DATA);

export const loadUserData = createAction(LOAD_DATA, props<{ user: User }>());

export const updateUserData = createAction(
  UPDATE_DATA,
  props<{
    id: Number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }>()
);
