import { useState } from "react";
import MathQuestion from "./MathQuestion";
import MathQuestionGenerator from "./MathQuestionGenerator";
import type { MathQuestionGeneratorOptions } from "./MathQuestionGenerator";
import QuizModel from "./Quiz";

interface QuizProps {
  options: MathQuestionGeneratorOptions;
}

export default function Quiz({ options }: QuizProps) {
  const [quiz, setQuiz] = useState(() => {
    const generator = new MathQuestionGenerator();
    const questions = generator.generate(options);
    return new QuizModel(questions);
  });
  const [question, setQuestion] = useState(quiz.question() as MathQuestion);
  const [answer, setAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (answer) {
          const isCorrect = quiz.answer(answer);
          setIsCorrect(isCorrect);
          setIsAnswered(true);
        } else {
          setIsAnswered(false);
        }
      }}
    >
      <p>{`${question.a} ${question.operation} ${question.b} = ?`}</p>
      <input
        type="text"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
      />
      {isAnswered && (
        <>
          <p>Jouw antwoord is {isCorrect ? "juist" : "onjuist"}</p>
          <p>
            <button
              onClick={() => {
                quiz.next();
                setQuestion(quiz.question() as MathQuestion);
                setAnswer("");
                setIsAnswered(false);
              }}
            >
              Volgende
            </button>
          </p>
        </>
      )}
    </form>
  );
}
