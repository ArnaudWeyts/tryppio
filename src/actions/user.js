export const ADD_PREFERENCE = 'ADD_PREFERENCE';

export function addPreference(preference) {
  return {
    type: ADD_PREFERENCE,
    preference,
  };
}
