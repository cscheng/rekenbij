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
        <span className={styles.inputWrapper}>
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
          {isAnswered && isCorrect && (
            <svg
              className={styles.icon}
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" fill="var(--green-color)" />
              <path
                d="M8 12.5L10.5 15L16 9.5"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {isAnswered && !isCorrect && (
            <svg
              className={styles.icon}
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" fill="var(--red-color)" />
              <path
                d="M8 8L16 16M16 8L8 16"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
      </p>

      {isAnswered && !isCorrect && (
        <div className={styles.feedback}>
          <p className={styles.feedbackText}>
            Het juiste antwoord is {question.answer}.
          </p>
        </div>
      )}
    </section>
  );
}
