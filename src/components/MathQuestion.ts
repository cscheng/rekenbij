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

interface AdditionOptions {
  maxValue: number;
}

interface SubtractionOptions {
  maxValue: number;
}

export type GeneratorOptions = (
  | {
      type: Operation.ADD;
      options: AdditionOptions;
    }
  | {
      type: Operation.SUBTRACT;
      options: SubtractionOptions;
    }
) & {
  count?: number;
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

export function generateQuestions({
  type,
  options,
  count = 10,
}: GeneratorOptions): Question[] {
  const generator = generators[type];
  return Array.from({ length: count }, () => generator(options));
}
