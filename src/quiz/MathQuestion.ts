import { Operation } from "./Operation";
import type Question from "./Question";

export default class MathQuestion implements Question {
  operation: Operation;
  a: number;
  b: number;
  answer: number;
  userAnswer: number | undefined = undefined;

  constructor(operation: Operation, a: number, b: number) {
    this.operation = operation;
    this.a = a;
    this.b = b;
    switch (operation) {
      case Operation.ADD:
        this.answer = this.a + this.b;
        break;
      case Operation.SUBTRACT:
        this.answer = this.a - this.b;
        break;
      case Operation.MULTIPLY:
        this.answer = this.a * this.b;
        break;
      case Operation.DIVIDE:
        this.answer = this.a / this.b;
        break;
    }
  }

  checkAnswer(answer: string): boolean {
    this.userAnswer = Number(answer);
    return this.userAnswer === this.answer;
  }
}
