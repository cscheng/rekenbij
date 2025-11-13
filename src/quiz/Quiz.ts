import type Question from "./Question";

export default class Quiz {
  private current: number = 0;
  private questions: Question[] = [];
  isFinished: boolean = false;

  constructor(questions: Question[]) {
    this.questions = questions;
  }

  getCurrentQuestion(): Question {
    return this.questions[this.current];
  }

  next(): void {
    if (this.current < this.questions.length - 1) {
      this.current++;
    }
  }

  submitAnswer(answer: string): boolean {
    const currentQuestion = this.getCurrentQuestion();
    const isCorrect = currentQuestion.checkAnswer(answer);
    if (this.current === this.questions.length - 1) {
      this.isFinished = true;
    }
    return isCorrect;
  }
}
