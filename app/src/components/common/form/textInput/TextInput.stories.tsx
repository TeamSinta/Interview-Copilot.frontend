import type { Meta, StoryObj } from "@storybook/react";
import TextInput from "./TextInput";

const meta = {
  title: "common/form/TextInput",
  component: TextInput,
  argTypes: {
    label: {
      control: {
        type: "text",
      },
      description: "Input label",
    },
    disable: {
      control: {
        type: "boolean",
      },
      description: "Disable or able",
    },
    error: {
      control: {
        type: "boolean",
      },
      description: "Error occur",
    },
    placeholder: {
      control: {
        type: "text",
      },
      description: "Input placeholder",
    },
  },
} as Meta<typeof TextInput>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    // label: "label",
    disable: false,
    placeholder: "placeholder",
    error: false,
  },
};

export const Disable: Story = {
  args: {
    // label: "label",
    disable: true,
    placeholder: "placeholder",
    error: false,
  },
};

export const Error: Story = {
  args: {
    // label: "label",
    disable: false,
    placeholder: "placeholder",
    error: true,
  },
};
