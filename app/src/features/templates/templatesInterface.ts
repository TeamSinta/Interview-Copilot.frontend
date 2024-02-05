export interface Interviewer {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
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
