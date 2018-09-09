import { combineReducers } from 'redux';
import questions from './questions';
import trip from './trip';
import user from './user';

const rootReducer = combineReducers({
  questions,
  trip,
  user
});

export default rootReducer;
