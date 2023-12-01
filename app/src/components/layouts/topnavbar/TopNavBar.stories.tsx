import type { Meta, StoryObj } from "@storybook/react";
import TopNavBar from "./TopNavBar";

const meta = {
  title: "NavBar/TopNavBar",
  component: TopNavBar,
} as Meta<typeof TopNavBar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
