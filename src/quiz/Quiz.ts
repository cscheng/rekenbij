import type Question from "./Question";

export default class Quiz {
  private current: number = 0;
  private questions: Question[] = [];
  private questionGenerator: () => Question[];
  isFinished: boolean = false;

  constructor(questionGenerator: () => Question[]) {
    this.questionGenerator = questionGenerator;
    this.questions = questionGenerator();
  }

  restart(): void {
    this.current = 0;
    this.isFinished = false;
    this.questions = this.questionGenerator();
  }

  getCurrentQuestion(): Question {
    return this.questions[this.current];
  }

  getCurrentIndex(): number {
    return this.current;
  }

  getTotalQuestions(): number {
    return this.questions.length;
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
