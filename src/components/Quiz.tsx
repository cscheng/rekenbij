import { useEffect, useMemo, useState } from "react";
import type { GeneratorOptions } from "../quiz/questionGenerators";
import { generateQuestions } from "../quiz/questionGenerators";
import QuizModel from "../quiz/Quiz";
import styles from "../styles/Quiz.module.css";
import Question from "./Question.tsx";

export default function Quiz(generatorOptions: GeneratorOptions) {
  const quiz = useMemo(() => {
    const questions = generateQuestions(generatorOptions);
    return new QuizModel(questions);
  }, [generatorOptions]);
  const [question, setQuestion] = useState(() => quiz.getCurrentQuestion());
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const next = () => {
    if (quiz.isFinished) {
      setIsFinished(true);
    } else {
      quiz.next();
      setQuestion(quiz.getCurrentQuestion());
      setAnswer("");
      setIsAnswered(false);
    }
  };

  useEffect(() => {
    if (isAnswered && isCorrect) {
      const timer = setTimeout(() => {
        next();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAnswered, isCorrect]);

  if (isFinished) {
    return <p>Klaar!</p>;
  }

  const currentIndex = quiz.getCurrentIndex();
  const totalQuestions = quiz.getTotalQuestions();
  const currentQuestionNumber = currentIndex + 1;
  const progressPercentage =
    ((currentIndex + (isAnswered ? 1 : 0)) / totalQuestions) * 100;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (answer) {
          const isCorrect = quiz.submitAnswer(answer);
          setIsCorrect(isCorrect);
          setIsAnswered(true);
        }
      }}
    >
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercentage}%` }}
          />
          <div className={styles.progressLabel}>
            {currentQuestionNumber} / {totalQuestions}
          </div>
        </div>
      </div>
      <Question
        question={question}
        answer={answer}
        isAnswered={isAnswered}
        isCorrect={isCorrect}
        setAnswer={setAnswer}
      />
      {isAnswered && !isCorrect && (
        <div className={styles.buttonContainer}>
          <button
            className={styles.nextButton}
            onClick={(event) => {
              event.preventDefault();
              next();
            }}
          >
            Volgende
          </button>
        </div>
      )}
    </form>
  );
}
