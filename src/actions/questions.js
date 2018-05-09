export const NEXT_QUESTION = 'NEXT_QUESTION';
export const RESET_QUESTIONS = 'RESET_QUESTIONS';

export function nextQuestion() {
  return {
    type: NEXT_QUESTION,
  };
}

export function resetQuestions() {
  return {
    type: RESET_QUESTIONS,
  };
}
