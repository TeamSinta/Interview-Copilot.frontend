import { IQuestion } from "./question";

export interface ITemplates {
  question_bank: {
    title: string;
    id: number;
  };
  questions: IQuestion[];
}

export interface IQuestionsBanks {
  id: number;
  title: string;
  description: string;
  questions: IQuestion[];
}
