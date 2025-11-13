export default interface Question {
  answer: any;
  userAnswer: any;

  checkAnswer(answer: any): boolean;
}
