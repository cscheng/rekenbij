import { useState } from "react";
import { generateQuestions } from "./MathQuestion";
import type { GeneratorOptions } from "./MathQuestion";
import QuizModel from "./Quiz";
import Question from "./Question.tsx";

export default function Quiz({ type, options }: GeneratorOptions) {
  const [quiz, setQuiz] = useState(() => {
    const questions = generateQuestions({ type, options });
    return new QuizModel(questions);
  });
  const [question, setQuestion] = useState(() => quiz.question());
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (answer) {
          const isCorrect = quiz.answer(answer);
          setIsCorrect(isCorrect);
          setIsAnswered(true);
        }
      }}
    >
      <Question
        question={question}
        answer={answer}
        isAnswered={isAnswered}
        isCorrect={isCorrect}
        setAnswer={setAnswer}
      />
      {isAnswered && (
        <p>
          <button
            onClick={() => {
              quiz.next();
              setQuestion(quiz.question());
              setAnswer("");
              setIsAnswered(false);
            }}
          >
            Volgende
          </button>
        </p>
      )}
    </form>
  );
}
