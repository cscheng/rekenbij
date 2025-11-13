import type Question from "./Question";

export default class Quiz {
  private current: number = 0;
  private questions: Question[] = [];
  isFinished: boolean = false;

  constructor(questions: Question[]) {
    this.questions = questions;
  }

  question(): Question {
    return this.questions[this.current];
  }

  next(): void {
    if (this.current < this.questions.length - 1) {
      this.current++;
    } else {
      this.isFinished = true;
    }
  }

  answer(answer: string): boolean {
    const currentQuestion = this.question();
    return currentQuestion.checkAnswer(answer);
  }
}
