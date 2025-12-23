import { useEffect, useMemo, useState } from "react";
import type { GeneratorOptions } from "../quiz/questionGenerators";
import { generateQuestions } from "../quiz/questionGenerators";
import QuizModel from "../quiz/Quiz";
import styles from "../styles/Quiz.module.css";
import CorrectIcon from "./CorrectIcon.tsx";
import IncorrectIcon from "./IncorrectIcon.tsx";
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
              <CorrectIcon
                className={styles.statIcon}
                width={24}
                height={24}
                circleColor="var(--green-color)"
                strokeColor="white"
              />
              <p className={styles.correctText}>{correctCount} goed</p>
            </div>
            <div className={styles.statItem}>
              <IncorrectIcon
                className={styles.statIcon}
                width={24}
                height={24}
                circleColor="var(--red-color)"
                strokeColor="white"
              />
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
