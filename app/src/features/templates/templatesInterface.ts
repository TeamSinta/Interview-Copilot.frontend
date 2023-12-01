export interface Interviewer {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string | null;
}

export interface TemplateResponse {
  id: string;
  department: string;
  company: string;
  interviewers: Interviewer[];
  role_title: string;
  location: string;
  image: string;
}

export interface TQuestions {
  question_text: string;
  competency: string;
  guidelines: string[];
  reply_time: number;
  difficulty: string;
}

export interface TemplateQuestions {
  filter(arg0: (templateQuestion: TemplateQuestions) => boolean): unknown;
  template_id: number;
  topic: string;
  question: TQuestions[];
}
