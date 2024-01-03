export interface IQuestion {
  [key: string]: number | string | string[];
  title: string;
  competency: string;
  time: number;
  level: string;
  detail: string;
  id: number;
}

export interface IQuestionsBanks {
  id: number;
  title: string;
  description: string;
  questions: IQuestion[];
}
