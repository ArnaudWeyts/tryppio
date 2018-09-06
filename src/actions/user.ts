export const ADD_PREFERENCE = 'ADD_PREFERENCE';
export const RESET_PREFERENCES = 'RESET_PREFERENCES';

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
