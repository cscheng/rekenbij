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

type MathQuestionGenerator = (
  options: GeneratorOptions["options"]
) => MathQuestion;

const createAdditionQuestion: MathQuestionGenerator = (
  options: AdditionOptions
) => {
  const a = getRandomNumber(1, options.maxValue);
  const b = getRandomNumber(0, options.maxValue - a); // Limit max result
  return new MathQuestion(Operation.ADD, a, b);
};

const createMathQuestions = (
  generatorFn: MathQuestionGenerator,
  options: GeneratorOptions["options"],
  count: number
): MathQuestion[] => {
  const questions = [];
  for (let i = 0; i < count; i++) {
    let question = generatorFn(options);
    if (i > 0) {
      const previousQuestion = questions[i - 1];
      while (
        previousQuestion.a === question.a &&
        previousQuestion.b === question.b
      ) {
        question = generatorFn(options);
      }
    }
    questions.push(question);
  }
  return questions;
};

const createAdditionQuestions = (
  options: AdditionOptions,
  count: number
): MathQuestion[] => {
  return createMathQuestions(createAdditionQuestion, options, count);
};

const createSubtractionQuestion: MathQuestionGenerator = (
  options: SubtractionOptions
) => {
  const a = getRandomNumber(1, options.maxValue);
  const b = getRandomNumber(0, a); // Prevent negative result
  return new MathQuestion(Operation.SUBTRACT, a, b);
};

const createSubtractionQuestions = (
  options: SubtractionOptions,
  count: number
): MathQuestion[] => {
  return createMathQuestions(createSubtractionQuestion, options, count);
};

const generators = {
  [Operation.ADD]: createAdditionQuestions,
  [Operation.SUBTRACT]: createSubtractionQuestions,
};

export function generateQuestions({
  type,
  options,
  count = 10,
}: GeneratorOptions): Question[] {
  const generator = generators[type];
  return generator(options, count);
}
