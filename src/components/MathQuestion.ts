import type Question from "./Question";
import { Operation } from "./Operation";

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

type AdditionOptions = {
  maxValue: number;
};

type SubtractionOptions = AdditionOptions;

export type GeneratorOptions = {
  [Operation.ADD]: AdditionOptions;
  [Operation.SUBTRACT]: SubtractionOptions;
};

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createAdditionQuestion = (options: AdditionOptions): MathQuestion => {
  const a = getRandomNumber(1, options.maxValue);
  const b = getRandomNumber(0, options.maxValue - a); // Limit max result
  return new MathQuestion(Operation.ADD, a, b);
};

const createSubtractionQuestion = (
  options: SubtractionOptions
): MathQuestion => {
  const a = getRandomNumber(1, options.maxValue);
  const b = getRandomNumber(0, a); // Prevent negative result
  return new MathQuestion(Operation.SUBTRACT, a, b);
};

const generators = {
  [Operation.ADD]: createAdditionQuestion,
  [Operation.SUBTRACT]: createSubtractionQuestion,
};

export function generateQuestions<T extends keyof GeneratorOptions>(
  type: T,
  options: GeneratorOptions[T],
  count: number = 10
): Question[] {
  const generator = generators[type];
  return Array.from({ length: count }, () => generator(options));
}
