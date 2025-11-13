import MathQuestionType from "../quiz/MathQuestion";
import type { QuestionProps } from "./Question.tsx";

interface MathQuestionProps extends QuestionProps {
  question: MathQuestionType;
}

export default function MathQuestion({
  question,
  answer,
  isAnswered,
  isCorrect,
  setAnswer,
}: MathQuestionProps) {
  return (
    <>
      <p>{`${question.a} ${question.operation} ${question.b} = ?`}</p>
      <input
        type="text"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
      />
      {isAnswered && <p>Het antwoord is {isCorrect ? "juist" : "onjuist"}</p>}
    </>
  );
}
