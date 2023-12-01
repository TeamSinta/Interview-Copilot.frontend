import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import CheckBox from "./CheckBox";

const meta = {
  title: "common/form/CheckBox",
  component: CheckBox,
  argTypes: {
    label: {
      description: "Label name next to the checkbox",
    },
    inputName: {
      description: "Checkbox input name",
    },
    checked: {
      description: "Checkbox checked status",
    },
    disabled: {
      description: "Checkbox disabled status",
    },
    onChange: {
      description: "Event triggered when the checkbox is clicked",
    },
  },
} as Meta<typeof CheckBox>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Check Box",
    inputName: "Check Box",
    checked: false,
    disabled: false,
    onChange: action("Change Handler"),
  },
};

export const Checked: Story = {
  args: {
    label: "Check Box",
    inputName: "Check Box",
    checked: true,
    disabled: false,
    onChange: action("Change Handler"),
  },
};

export const Disabled: Story = {
  args: {
    label: "Check Box",
    inputName: "Check Box",
    checked: false,
    disabled: true,
    onChange: () => {},
  },
};
