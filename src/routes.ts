import type { GeneratorOptions } from "./quiz/MathQuestion";
import { Operation } from "./quiz/Operation";

interface QuizPage {
  title: string;
  quiz: GeneratorOptions;
}

interface CategoryPage {
  title: string;
  quizzes: QuizPage[];
}

export const pages: CategoryPage[] = [
  {
    title: "Plussommen",
    quizzes: [
      {
        title: "Plussommen tot 5",
        quiz: {
          type: Operation.ADD,
          options: {
            maxValue: 5,
          },
        },
      },
      {
        title: "Plussommen tot 10",
        quiz: {
          type: Operation.ADD,
          options: {
            maxValue: 10,
          },
        },
      },
      {
        title: "Plussommen tot 15",
        quiz: {
          type: Operation.ADD,
          options: {
            maxValue: 15,
          },
        },
      },
      {
        title: "Plussommen tot 20",
        quiz: {
          type: Operation.ADD,
          options: {
            maxValue: 20,
          },
        },
      },
    ],
  },
  {
    title: "Minsommen",
    quizzes: [
      {
        title: "Minsommen tot 5",
        quiz: {
          type: Operation.SUBTRACT,
          options: {
            maxValue: 5,
          },
        },
      },
      {
        title: "Minsommen tot 10",
        quiz: {
          type: Operation.SUBTRACT,
          options: {
            maxValue: 10,
          },
        },
      },
    ],
  },
];

const slugify = (title: string) => {
  return title.toLowerCase().replace(/ /g, "-");
};

export const getCategoryPaths = () =>
  pages.map((category) => ({
    params: {
      category: slugify(category.title),
    },
    props: {
      title: category.title,
    },
  }));

export const getQuizPaths = (parentPath?: string) =>
  pages.flatMap((category) => {
    const categoryPath = slugify(category.title);
    if (parentPath && categoryPath !== parentPath) {
      return [];
    }
    return category.quizzes.map((quiz) => ({
      params: { quiz: `${categoryPath}/${slugify(quiz.title)}` },
      props: {
        title: quiz.title,
        quiz: quiz.quiz,
      },
    }));
  });
