import MathQuestion from "./MathQuestion";
import { Operation } from "./Operation";
import type Question from "./Question";

interface AdditionOptions {
  maxValue: number;
}

interface SubtractionOptions {
  maxValue: number;
}

interface MultiplicationOptions {
  multiplier: number | number[];
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
  | {
      type: Operation.MULTIPLY;
      options: MultiplicationOptions;
    }
) & {
  count?: number;
};

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createAdditionQuestion = ({ maxValue }: AdditionOptions) => {
  const a = getRandomNumber(1, maxValue);
  const b = getRandomNumber(0, maxValue - a); // Limit max result
  return new MathQuestion(Operation.ADD, a, b);
};

const createSubtractionQuestion = ({ maxValue }: SubtractionOptions) => {
  const a = getRandomNumber(1, maxValue);
  const b = getRandomNumber(0, a); // Prevent negative result
  return new MathQuestion(Operation.SUBTRACT, a, b);
};

const createMultiplicationQuestion = ({
  multiplier,
}: MultiplicationOptions) => {
  const multiplicand = getRandomNumber(1, 10);
  if (Array.isArray(multiplier)) {
    multiplier = multiplier[Math.floor(Math.random() * multiplier.length)];
  }
  return new MathQuestion(Operation.MULTIPLY, multiplicand, multiplier);
};

const createMathQuestions = <T extends GeneratorOptions["options"]>(
  generatorFn: (options: T) => MathQuestion,
  options: T,
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

export function generateQuestions({
  type,
  options,
  count = 10,
}: GeneratorOptions): Question[] {
  switch (type) {
    case Operation.ADD:
      return createMathQuestions(createAdditionQuestion, options, count);
    case Operation.SUBTRACT:
      return createMathQuestions(createSubtractionQuestion, options, count);
    case Operation.MULTIPLY:
      return createMathQuestions(createMultiplicationQuestion, options, count);
  }
}
