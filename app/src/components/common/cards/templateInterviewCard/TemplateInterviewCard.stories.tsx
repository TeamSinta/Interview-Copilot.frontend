import { Meta, StoryObj } from "@storybook/react";
import TemplateInterviewCard from "./TemplateInterviewCard";

const meta = {
  title: "common/cards/TemplateInterviewCard",
  component: TemplateInterviewCard,
  argTypes: {
    title: {
      description: "Card title",
    },
    disable: {
      description:
        "Availability is determined by conditions, making it unclickable when not available.",
    },
  },
} as Meta<typeof TemplateInterviewCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "FrondEnd Problem Solving",
    disable: false,
    questions: new Array(10),
  },
};

export const Disable: Story = {
  args: {
    title: "FrondEnd Problem Solving",
    disable: true,
    questions: new Array(10),
  },
};
