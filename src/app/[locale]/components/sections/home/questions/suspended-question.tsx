import { fetchQuestions } from "@/lib/fetchers/questions";
import Question from "./question"; // Your original component

export async function SuspendedQuestion() {
  const questions = await fetchQuestions();

  if (questions.length === 0) {
    return null;
  }

  return <Question questions={questions} />;
}