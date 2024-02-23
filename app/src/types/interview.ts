export interface IInterviewRound {
  title: string;
  id: string;
  candidate_id: number;
  candidate_name: string;
  video_uri: string;
  created_at: string | number;
  thumbnail_uri?: string;
}
