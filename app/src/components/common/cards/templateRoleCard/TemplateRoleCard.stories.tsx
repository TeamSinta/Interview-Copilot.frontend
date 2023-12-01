import { Meta, StoryObj } from "@storybook/react";
import TemplateRoleCard from "./TemplateRoleCard";

const meta = {
  title: "common/cards/TemplateRoleCard",
  component: TemplateRoleCard,
  argTypes: {
    title: {
      description: "Card title",
    },
    disable: {
      description:
        "Availability is determined by conditions, making it unclickable when not available.",
    },
  },
} as Meta<typeof TemplateRoleCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Graphic Design Screening Round",
    disable: false,
    questions: new Array(8),
    sections: new Array(15),
  },
};

export const Disable: Story = {
  args: {
    title: "Graphic Design Screening Round",
    disable: true,
    questions: new Array(8),
    sections: new Array(15),
  },
};
