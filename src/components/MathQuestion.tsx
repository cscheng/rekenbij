import { useEffect, useRef } from "react";
import MathQuestionType from "../quiz/MathQuestion";
import styles from "../styles/MathQuestion.module.css";
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <section className={styles.mathQuestion}>
      <p className={styles.equation}>
        {question.a} {question.operation} {question.b} ={" "}
        <input
          ref={inputRef}
          className={`${styles.numberInput} ${
            isAnswered ? (isCorrect ? styles.correct : styles.incorrect) : ""
          }`}
          type="text"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          readOnly={isAnswered}
        />
      </p>

      {isAnswered && !isCorrect && (
        <p>Het juiste antwoord is {question.answer}.</p>
      )}
    </section>
  );
}
