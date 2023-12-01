import type { StoryObj, Meta } from "@storybook/react";

import SideNavBar from "./SideNavBar";

const meta = {
  title: "NavBar/SideNavBar",
  component: SideNavBar,
} as Meta<typeof SideNavBar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
