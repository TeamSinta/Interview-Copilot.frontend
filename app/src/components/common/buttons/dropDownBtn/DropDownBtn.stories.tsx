import React from "react";
import { Story, Meta } from "@storybook/react";
import { DropDownButton, IDropDownButtonProps } from "./DropDownBtn";
import { PlusIcon, CalendarIcon } from "../../svgIcons/Icons";
import { BackgroundColor } from "@/features/utils/utilEnum";

export default {
  title: "common/buttons/DropDownButton",
  component: DropDownButton,
} as Meta;

const Template: Story<IDropDownButtonProps> = (args) => (
  <DropDownButton {...args} />
);

export const Example = Template.bind({});
Example.args = {
  label: "Create a Meeting",
  icon: <PlusIcon />,
  disable: false,
  className: BackgroundColor.ACCENT_PURPLE,
  buttons: [
    {
      label: "Start a Meeting",
      icon: <PlusIcon />,
      onClick: () => {
        //  onClick logic here
      },
    },
    {
      label: "Plan a Meeting",
      icon: <CalendarIcon />,
      onClick: () => {},
    },
  ],
};
