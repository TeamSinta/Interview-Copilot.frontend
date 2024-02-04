export interface IQuestion {
  [key: string]: number | string | string[] | unknown;
  title: string;
  competency: string;
  time: number;
  level: string;
  detail: string;
  id: number;
  guidelines: string;
  company: number;
  embedding: unknown;
  question_text: string;
  reply_time: number;
  review: unknown;
  user: number;
  difficulty: string;
}

export interface ITemplates {
  question_bank: {
    title: string;
    id: number;
  };
  questions: IQuestion[];
}

export interface IQuestionsBank {
  [key: string]: number | string | string[];
  title: string;
  competency: string;
  time: number;
  level: string;
  guidelines: string;
  id: number;
  questionBank: [];
}

export interface IQuestionsBanks {
  id: number;
  title: string;
  description: string;
  questions: IQuestion[];
}
