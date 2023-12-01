import type { Meta, StoryObj } from "@storybook/react";
import SearchInput from "./SearchInput";

const meta = {
  title: "common/form/SearchInput",
  component: SearchInput,
  argTypes: {
    disable: {
      control: {
        type: "boolean",
      },
      description: "Disable or able",
    },
    placeholder: {
      control: {
        type: "text",
      },
      description: "Input placeholder",
    },
  },
} as Meta<typeof SearchInput>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    disable: false,
    placeholder: "Search for a role or candidate",
    error: false,
  },
};

export const Disable: Story = {
  args: {
    disable: true,
    placeholder: "Search for a role or candidate",
    error: false,
  },
};

export const Error: Story = {
  args: {
    disable: false,
    placeholder: "Search for a role or candidate",
    error: true,
  },
};
