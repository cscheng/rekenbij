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
  const totalQuestions = quiz.getTotalQuestions();
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

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
    return (
      <div className={styles.resultsContainer}>
        <div className={styles.resultsCard}>
          <h1 className={styles.resultsTitle}>Goed gedaan!</h1>
          <div className={styles.resultsStats}>
            <p className={styles.totalText}>
              Je hebt {totalQuestions} vragen beantwoord:
            </p>
            <div className={styles.statItem}>
              <svg
                className={styles.statIcon}
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
              <p className={styles.correctText}>{correctCount} goed</p>
            </div>
            <div className={styles.statItem}>
              <svg
                className={styles.statIcon}
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
              <p className={styles.incorrectText}>{incorrectCount} fout</p>
            </div>
          </div>
          <a href="/" className={styles.quitButton}>
            Klaar
          </a>
        </div>
      </div>
    );
  }

  const currentIndex = quiz.getCurrentIndex();
  const currentQuestionNumber = currentIndex + 1;
  const progressPercentage =
    ((currentIndex + (isAnswered ? 1 : 0)) / totalQuestions) * 100;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (answer && !isAnswered) {
          const isCorrect = quiz.submitAnswer(answer);
          setIsCorrect(isCorrect);
          setIsAnswered(true);
          if (isCorrect) {
            setCorrectCount((prev) => prev + 1);
          } else {
            setIncorrectCount((prev) => prev + 1);
          }
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
