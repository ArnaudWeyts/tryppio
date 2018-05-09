export const ADD_PREFERENCE = 'ADD_PREFERENCE';
export const RESET_PREFERENCES = 'RESET_PREFERENCES';

export function addPreference(preference) {
  return {
    type: ADD_PREFERENCE,
    preference,
  };
}

export function resetPreferences() {
  return {
    type: RESET_PREFERENCES,
  };
}
