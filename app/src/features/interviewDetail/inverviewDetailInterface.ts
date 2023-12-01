import { IQuestion } from "../interviews/interviewsInterface";
import { IMockMembers } from "../roles/rolesInterface";

export interface IInterviewDetailStaging {
  interviewer: IMockMembers[];
  section: ISection[];
}

export interface ISection {
  id: number;
  topics_text: string;
  time: number;
  questions: IQuestion[];
}

export interface InterviewDetailResponse {
  id: number;
  question_text: string;
  difficulty: string;
  guidelines: string;
  template_id: number;
  template_topic_id: number;
  company_id: number;
  reply_time: number;
  competency: string;
}
