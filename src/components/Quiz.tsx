import { useMemo, useRef, useState } from "react";
import type { GeneratorOptions } from "../quiz/questionGenerators";
import { generateQuestions } from "../quiz/questionGenerators";
import QuizModel from "../quiz/Quiz";
import styles from "../styles/Quiz.module.css";
import CorrectIcon from "./CorrectIcon.tsx";
import IncorrectIcon from "./IncorrectIcon.tsx";
import Question from "./Question.tsx";

// Delay (in ms) before auto-advancing to the next question after answering
const AUTO_ADVANCE_DELAY = 1500;

export default function Quiz(generatorOptions: GeneratorOptions) {
  const quiz = useMemo(() => {
    return new QuizModel(() => generateQuestions(generatorOptions));
  }, [generatorOptions]);
  const [question, setQuestion] = useState(() => quiz.getCurrentQuestion());
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const totalQuestions = quiz.getTotalQuestions();
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    if (quiz.isFinished) {
      setIsFinished(true);
    } else {
      quiz.next();
      setQuestion(quiz.getCurrentQuestion());
      setAnswer("");
      setIsAnswered(false);
    }
  };

  const restart = () => {
    quiz.restart();
    setQuestion(quiz.getCurrentQuestion());
    setAnswer("");
    setIsCorrect(false);
    setIsAnswered(false);
    setIsFinished(false);
    setCorrectCount(0);
    setIncorrectCount(0);
  };

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
              <CorrectIcon
                className={styles.statIcon}
                width={24}
                height={24}
                circleColor="var(--color-green)"
                strokeColor="white"
              />
              <p className={styles.correctText}>{correctCount} goed</p>
            </div>
            <div className={styles.statItem}>
              <IncorrectIcon
                className={styles.statIcon}
                width={24}
                height={24}
                circleColor="var(--color-red)"
                strokeColor="white"
              />
              <p className={styles.incorrectText}>{incorrectCount} fout</p>
            </div>
          </div>
          <div className={styles.resultsButtonContainer}>
            <button className={styles.restartButton} onClick={restart}>
              Opnieuw
            </button>
            <a href="/" className={styles.quitButton}>
              Klaar
            </a>
          </div>
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
        if (isAnswered) {
          next();
          return;
        }
        if (answer && !isAnswered) {
          const isCorrect = quiz.submitAnswer(answer);
          setIsCorrect(isCorrect);
          setIsAnswered(true);
          if (isCorrect) {
            setCorrectCount((prev) => prev + 1);
            timer.current = setTimeout(() => {
              next();
            }, AUTO_ADVANCE_DELAY);
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
      <div className={styles.questionContainer}>
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
      </div>
    </form>
  );
}
