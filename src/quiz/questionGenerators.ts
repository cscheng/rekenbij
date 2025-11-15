import MathQuestion from "./MathQuestion";
import { Operation } from "./Operation";
import type Question from "./Question";

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

const createSubtractionQuestion: MathQuestionGenerator = (
  options: SubtractionOptions
) => {
  const a = getRandomNumber(1, options.maxValue);
  const b = getRandomNumber(0, a); // Prevent negative result
  return new MathQuestion(Operation.SUBTRACT, a, b);
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

const generators = {
  [Operation.ADD]: (options: AdditionOptions, count: number) =>
    createMathQuestions(createAdditionQuestion, options, count),
  [Operation.SUBTRACT]: (options: SubtractionOptions, count: number) =>
    createMathQuestions(createSubtractionQuestion, options, count),
};

export function generateQuestions({
  type,
  options,
  count = 10,
}: GeneratorOptions): Question[] {
  const generator = generators[type];
  return generator(options, count);
}
