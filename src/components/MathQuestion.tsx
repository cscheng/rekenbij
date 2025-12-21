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
  return (
    <section className={styles.mathQuestion}>
      <p className={styles.equation}>
        {question.a} {question.operation} {question.b} ={" "}
        <input
          className={`${styles.numberInput} ${
            isAnswered ? (isCorrect ? styles.correct : styles.incorrect) : ""
          }`}
          type="text"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        />
      </p>

      {isAnswered && !isCorrect && (
        <p>Het juiste antwoord is {question.answer}.</p>
      )}
    </section>
  );
}
