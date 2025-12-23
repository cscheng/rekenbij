import { useEffect, useRef } from "react";
import MathQuestionType from "../quiz/MathQuestion";
import styles from "../styles/MathQuestion.module.css";
import CorrectIcon from "./CorrectIcon.tsx";
import IncorrectIcon from "./IncorrectIcon.tsx";
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
            inputMode="numeric"
            value={answer}
            onChange={(event) => {
              const val = event.target.value.replace(/\D/g, "");
              setAnswer(val);
            }}
            readOnly={isAnswered}
          />
          {isAnswered && isCorrect && (
            <CorrectIcon
              className={styles.icon}
              circleColor="var(--green-color)"
              strokeColor="white"
            />
          )}
          {isAnswered && !isCorrect && (
            <IncorrectIcon
              className={styles.icon}
              circleColor="var(--red-color)"
              strokeColor="white"
            />
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
