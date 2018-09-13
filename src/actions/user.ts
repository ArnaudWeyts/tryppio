import { AnyAction, Dispatch } from 'redux';

import userService from '../services/userService';

export const ADD_PREFERENCE = 'ADD_PREFERENCE';
export const RESET_PREFERENCES = 'RESET_PREFERENCES';
export const LOGIN = 'LOGIN';

export function addPreference(preference: string) {
  return {
    preference,
    type: ADD_PREFERENCE
  };
}

export function resetPreferences() {
  return {
    type: RESET_PREFERENCES
  };
}

export function login(username: string, password: string) {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        // `history.push('/');
      },
      error => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      }
    );

    function request(user: { username: string }) {
      return { user, type: 'LOGIN_REQUEST' };
    }
    function success(user: { username: string }) {
      return { user, type: 'LOGIN_SUCCESS' };
    }
    function failure(error: string) {
      return { error, type: 'LOGIN_FAILURE,' };
    }
  };
}
