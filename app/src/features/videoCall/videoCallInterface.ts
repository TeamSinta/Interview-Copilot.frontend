export interface videoCallState {
  active_call: boolean;
  recording: boolean;
  participans: {
    interviewer: {
      name: string;
    };
    participant: {
      name: string;
    };
  };
}
