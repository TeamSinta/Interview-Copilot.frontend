import { Meta, StoryObj } from "@storybook/react";
import TypeScale from "./TypeScale";

const meta = {
  title: "StyleGuid/TypeScale",
  component: TypeScale,
} as Meta<typeof TypeScale>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Type Scale",
  },
};
