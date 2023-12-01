import { type Meta, type StoryObj } from "@storybook/react";
import Dropdown from "./DropdownFilter";

const meta = {
  title: "common/filters/DropdownFilter",
  component: Dropdown,
  argTypes: {
    label: {
      control: {
        type: "text",
      },
      description: "Label for select",
    },
    dropdownName: {
      control: {
        type: "text",
      },
      description: "The name attribute of a select element.",
    },
  },
} as Meta<typeof Dropdown>;
export default meta;

type Story = StoryObj<typeof meta>;

export const DropdownFilter: Story = {
  args: {
    label: "stage",
    optionArr: [
      { name: "BANANA", value: "banana" },
      { name: "APPLE", value: "apple" },
      { name: "ORANGE", value: "orange" },
    ],
    dropdownName: "fruit",
  },
};
