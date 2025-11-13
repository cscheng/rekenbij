import type { GeneratorOptions } from "./components/MathQuestion";
import { Operation } from "./components/Operation";

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
      path: slugify(category.title),
    },
    props: {
      title: category.title,
    },
  }));

export const getQuizPaths = () =>
  pages.flatMap((category) => {
    const parentPath = slugify(category.title);
    return category.quizzes.map((quiz) => ({
      params: { path: `${parentPath}/${slugify(quiz.title)}` },
      props: {
        title: quiz.title,
        quiz: quiz.quiz,
      },
    }));
  });
