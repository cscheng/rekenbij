import type Question from "./Question";
import MathQuestion from "./MathQuestion";
import type { Operation } from "./Operation";

interface GeneratorOptions {
  count?: number;
}

interface QuestionGenerator {
  generate(options: GeneratorOptions): Question[];
}

export interface MathQuestionGeneratorOptions extends GeneratorOptions {
  operation: Operation;
  maxNumber?: number;
  maxResult: number;
}

export default class MathQuestionGenerator implements QuestionGenerator {
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generate(options: MathQuestionGeneratorOptions): Question[] {
    const { maxResult, count = 10 } = options;
    const maxNumber = options.maxNumber ?? maxResult;

    const questions: Question[] = [];
    for (let i = 0; i < count; i++) {
      const a = this.getRandomNumber(1, maxNumber);
      const b = this.getRandomNumber(0, maxResult - a);
      const question = new MathQuestion(options.operation, a, b);
      questions.push(question);
    }
    return questions;
  }
}
