import type QuestionType from "./Question";
import MathQuestion from "./MathQuestion";
import MathQuestionComponent from "./MathQuestion.tsx";

export interface QuestionProps {
  question: QuestionType;
  answer: string;
  isAnswered: boolean;
  isCorrect: boolean;
  setAnswer: (answer: string) => void;
}

const questionComponentMap = new Map([[MathQuestion, MathQuestionComponent]]);

export default function Question({
  question,
  answer,
  isAnswered,
  isCorrect,
  setAnswer,
}: QuestionProps) {
  for (const [QuestionClass, QuestionComponent] of questionComponentMap) {
    if (question instanceof QuestionClass) {
      return (
        <QuestionComponent
          question={question}
          answer={answer}
          isAnswered={isAnswered}
          isCorrect={isCorrect}
          setAnswer={setAnswer}
        />
      );
    }
  }
  return null;
}
