import { Meta, StoryObj } from "@storybook/react";
import ConclusionInterviewCard from "./ConclusionInterviewCard";

const meta = {
  title: "common/cards/ConclusionInterviewCard",
  component: ConclusionInterviewCard,
  argTypes: {
    title: {
      description: "Card title",
    },
    disable: {
      description:
        "Availability is determined by conditions, making it unclickable when not available.",
    },
  },
} as Meta<typeof ConclusionInterviewCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: "Bill Gates",
    date: new Date("2023-07-28").getTime(), // Provide the correct creation date in milliseconds
    title: "Frontend Problem Solving",
    disable: false,
  },
};

export const Disable: Story = {
  args: {
    name: "Bill Gates",
    date: new Date("2022-11-21").getTime(), // Provide the correct creation date in milliseconds
    title: "Frontend Problem Solving",
    disable: true,
  },
};

export const MoreThan4: Story = {
  args: {
    name: "Bill Gates",
    date: new Date("2022-11-21").getTime(), // Provide the correct creation date in milliseconds
    title: "Frontend Problem Solving",
    disable: false,
  },
};
