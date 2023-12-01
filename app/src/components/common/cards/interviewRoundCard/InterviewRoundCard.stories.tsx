import { Meta, Story } from "@storybook/react";
import InterviewRoundCard, {
  InterviewRoundCardProps,
} from "./InterviewRoundCard";

export default {
  title: "common/cards/InterviewRoundCard",
  component: InterviewRoundCard,
} as Meta;

const Template: Story<InterviewRoundCardProps> = (args) => (
  <InterviewRoundCard {...args} />
);

const baseArgs = {
  image: "https://ca.slack-edge.com/T04C82XCPRU-U04KS4AQG0N-5dc6b4356f80-512",
  title: "Coding Round",
  numberOfQuestions: "26 questions",
  roundId: "round1",
};

export const Default = Template.bind({});
Default.args = { ...baseArgs };

export const Selected = Template.bind({});
Selected.args = {
  ...baseArgs,

  selected: true, // Set selected prop to true
};
