import { Operation } from "./quiz/Operation";
import type { GeneratorOptions } from "./quiz/questionGenerators";

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
  {
    title: "Tafels",
    quizzes: (() => {
      const tables1to5: QuizPage[] = Array.from({ length: 5 }, (_, i) => ({
        title: `Tafel van ${i + 1}`,
        quiz: {
          type: Operation.MULTIPLY,
          options: {
            multiplier: i + 1,
          },
        },
      }));
      const tablesCombined1to5: QuizPage = {
        title: "Tafel van 1-5",
        quiz: {
          type: Operation.MULTIPLY,
          options: {
            multiplier: [1, 2, 3, 4, 5],
          },
        },
      };
      const tables6to10: QuizPage[] = Array.from({ length: 5 }, (_, i) => ({
        title: `Tafel van ${i + 6}`,
        quiz: {
          type: Operation.MULTIPLY,
          options: {
            multiplier: i + 6,
          },
        },
      }));
      const tablesCombined6to10: QuizPage = {
        title: "Tafel van 6-10",
        quiz: {
          type: Operation.MULTIPLY,
          options: {
            multiplier: [6, 7, 8, 9, 10],
          },
        },
      };
      return [
        ...tables1to5,
        tablesCombined1to5,
        ...tables6to10,
        tablesCombined6to10,
      ];
    })(),
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
