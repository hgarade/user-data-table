import { createReducer, on } from '@ngrx/store';
import { equals } from 'ramda';
import { loadUserData, updateUserData } from './user.actions';
import { User } from '../type/user.types';

export const initialState: User = {
  users: [],
  total: 0,
  skip: 0,
  limit: 0,
};
export const userDataReducer = createReducer(
  initialState,
  on(
    loadUserData,
    (state, action): User => ({
      users: action.user.users,
      total: action.user.total,
      limit: action.user.limit,
      skip: action.user.skip,
    })
  ),
  on(updateUserData, (state, action): User => {
    return {
      ...state,
      users: state.users
        .map((element) => ({ ...element }))
        .map((element) => {
          if (equals(element.id, action.id)) {
            return {
              ...element,
              firstName: action.firstName,
              lastName: action.lastName,
              phone: action.phone,
              email: action.email,
            };
          } else {
            return element;
          }
        }),
    };
  })
);
