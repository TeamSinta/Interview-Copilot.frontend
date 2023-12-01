import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { TextIconBtnL, TextIconBtnLL, TextIconBtnXL } from "./TextIconBtn";
import {
  PlusIcon,
  GoogleIcon,
  RightBracketIcon,
  AsteriskIcon,
  ArrowDownIcon,
} from "@/components/common/svgIcons/Icons";
import { BackgroundColor } from "@/features/utils/utilEnum";

const icons = {
  Plus: <PlusIcon />,
  Google: <GoogleIcon />,
  RightBalcket: <RightBracketIcon />,
  Asterisk: <AsteriskIcon />,
  ArrowDown: <ArrowDownIcon />,
};

const meta = {
  title: "common/buttons/TextIconButton",
  component: TextIconBtnL,
  argTypes: {
    icon: {
      control: {
        type: "select",
        options: Object.keys(icons),
        mapping: {
          icons,
        },
      },
      description: "Icon components",
    },
    label: {
      control: {
        type: "text",
      },
      description: "Text for button",
    },
    disable: {
      control: {
        type: "boolean",
      },
      description: "Disable or able",
    },
    className: {
      control: {
        type: "select",
      },
      options: [BackgroundColor.ACCENT_PURPLE, BackgroundColor.WHITE],
      table: { defaultValue: { summary: BackgroundColor.ACCENT_PURPLE } },
    },
  },
  decorators: [(story) => <div style={{ width: "223px" }}>{story()}</div>],
} as Meta<typeof TextIconBtnL>;
export default meta;

type Story = StoryObj<typeof meta>;

export const PrimaryTextIconBtnPXL: Story = {
  args: {
    label: "Create Custom Role",
    icon: <AsteriskIcon />,
    disable: false,
    className: BackgroundColor.ACCENT_PURPLE,
  },
  render: (args) => {
    return <TextIconBtnXL {...args} />;
  },
};

export const DisableTextIconBtnPXL: Story = {
  args: {
    label: "Create Custom Role",
    icon: <AsteriskIcon />,
    disable: true,
    className: BackgroundColor.ACCENT_PURPLE,
  },
  render: (args) => {
    return <TextIconBtnXL {...args} />;
  },
};

export const PrimaryTextIconBtnWXL: Story = {
  args: {
    label: "Add Role from Template",
    icon: <ArrowDownIcon />,
    disable: false,
    className: BackgroundColor.WHITE,
  },
  render: (args) => {
    return <TextIconBtnXL {...args} />;
  },
};

export const DisableTextIconBtnWXL: Story = {
  args: {
    label: "Add Role from Template",
    icon: <ArrowDownIcon />,
    disable: true,
    className: BackgroundColor.WHITE,
  },
  render: (args) => {
    return <TextIconBtnXL {...args} />;
  },
};

export const PrimaryTextIconBtnPLL: Story = {
  args: {
    label: "Drop or Browse your file",
    icon: <ArrowDownIcon />,
    disable: false,
    className: BackgroundColor.ACCENT_PURPLE,
  },
  render: (args) => {
    return <TextIconBtnLL {...args} />;
  },
};

export const DisableTextIconBtnPLL: Story = {
  args: {
    label: "Drop or Browse your file",
    icon: <ArrowDownIcon />,
    disable: true,
    className: BackgroundColor.ACCENT_PURPLE,
  },
  render: (args) => {
    return <TextIconBtnLL {...args} />;
  },
};

export const PrimaryTextIconBtnPL: Story = {
  args: {
    label: "Create",
    icon: <PlusIcon />,
    disable: false,
    className: BackgroundColor.ACCENT_PURPLE,
  },
};

export const DisableTextIconBtnPL: Story = {
  args: {
    label: "Create",
    icon: <PlusIcon />,
    disable: true,
    className: BackgroundColor.ACCENT_PURPLE,
  },
};

export const PrimaryTextIconBtnWL: Story = {
  args: {
    label: "Create",
    icon: <PlusIcon />,
    disable: false,
    className: BackgroundColor.WHITE,
  },
};

export const DisableTextIconBtnWL: Story = {
  args: {
    label: "Create",
    icon: <PlusIcon />,
    disable: true,
    className: BackgroundColor.WHITE,
  },
};
