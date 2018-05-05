import { NEXT_QUESTION } from '../actions/questions';
import questionList from '../questions.json';

const INITIAL_STATE = {
  current: 0,
  maxQuestions: questionList.length,
  progressPercent: 0,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEXT_QUESTION: {
      const { current, maxQuestions } = state;
      return {
        ...state,
        current: current + 1,
        progressPercent: 100 * ((current + 1) / maxQuestions),
      };
    }
    default:
      return state;
  }
}
