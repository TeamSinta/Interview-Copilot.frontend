import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { BackgroundColor } from "@/features/utils/utilEnum";
import { IconBtnL, IconBtnM, IconBtnS } from "./IconBtn";
import {
  ArrowDownIcon,
  AsteriskIcon,
  DoorIcon,
  GoogleIcon,
  PlusIcon,
  RightBracketIcon,
} from "@/components/common/svgIcons/Icons";
import { action } from "@storybook/addon-actions";
import ElWrap from "@/components/layouts/elWrap/ElWrap";

const icons = {
  PlusIcon: <PlusIcon />,
  Google: <GoogleIcon />,
  RightBalcket: <RightBracketIcon />,
  Asterisk: <AsteriskIcon />,
  ArrowDown: <ArrowDownIcon />,
  Door: <DoorIcon />,
};

const meta = {
  title: "common/buttons/IconBtn",
  component: IconBtnL,
  argTypes: {
    icon: {
      control: { type: "select", lables: { Google: <GoogleIcon /> } },
      options: Object.keys(icons),
      mapping: {
        ...icons,
      },
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
    },
  },
} as Meta<typeof IconBtnL>;
export default meta;

type Story = StoryObj<typeof meta>;

export const PrimaryIconBtnPL: Story = {
  args: {
    icon: <PlusIcon />,
    disable: false,
    className: BackgroundColor.ACCENT_PURPLE,
    onClick: action("Click Handler"),
  },
  decorators: [
    (story) => (
      <ElWrap w={56} h={134}>
        {story()}
      </ElWrap>
    ),
  ],
};

export const DisableIconBtnPL: Story = {
  args: {
    icon: <PlusIcon />,
    disable: true,
    className: BackgroundColor.ACCENT_PURPLE,
    onClick: action("Click Handler"),
  },
  decorators: [
    (story) => (
      <ElWrap w={56} h={134}>
        {story()}
      </ElWrap>
    ),
  ],
};

export const PrimaryIconBtnWL: Story = {
  args: {
    icon: <PlusIcon />,
    disable: false,
    className: BackgroundColor.WHITE,
    onClick: action("Click Handler"),
  },
  decorators: [
    (story) => (
      <ElWrap w={56} h={134}>
        {story()}
      </ElWrap>
    ),
  ],
};

export const DisableIconBtnWL: Story = {
  args: {
    icon: <PlusIcon />,
    disable: true,
    className: BackgroundColor.WHITE,
    onClick: action("Click Handler"),
  },
  decorators: [
    (story) => (
      <ElWrap w={56} h={134}>
        {story()}
      </ElWrap>
    ),
  ],
};

export const PrimaryIconBtnW: Story = {
  args: {
    icon: <PlusIcon />,
    disable: false,
    className: BackgroundColor.WHITE,
    onClick: action("Click Handler"),
  },
  decorators: [
    (story) => (
      <ElWrap w={93} h={40}>
        {story()}
      </ElWrap>
    ),
  ],
};

export const DisableIconBtnW: Story = {
  args: {
    icon: <PlusIcon />,
    disable: true,
    className: BackgroundColor.WHITE,
    onClick: action("Click Handler"),
  },
  decorators: [
    (story) => (
      <ElWrap w={93} h={40}>
        {story()}
      </ElWrap>
    ),
  ],
};

export const PrimaryIconBtnP: Story = {
  args: {
    icon: <PlusIcon />,
    disable: false,
    className: BackgroundColor.ACCENT_PURPLE,
    onClick: action("Click Handler"),
  },
  decorators: [
    (story) => (
      <ElWrap w={93} h={40}>
        {story()}
      </ElWrap>
    ),
  ],
};

export const DisableIconBtnP: Story = {
  args: {
    icon: <PlusIcon />,
    disable: true,
    className: BackgroundColor.ACCENT_PURPLE,
    onClick: action("Click Handler"),
  },
  decorators: [
    (story) => (
      <ElWrap w={93} h={40}>
        {story()}
      </ElWrap>
    ),
  ],
};

export const PrimaryIconBtnPLM: Story = {
  args: {
    icon: <PlusIcon />,
    disable: false,
    className: BackgroundColor.ACCENT_PURPLE,
    onClick: action("Click Handler"),
  },
  decorators: [
    (story) => (
      <ElWrap w={40} h={40}>
        {story()}
      </ElWrap>
    ),
  ],
};

export const DisableIconBtnPLM: Story = {
  args: {
    icon: <PlusIcon />,
    disable: true,
    className: BackgroundColor.ACCENT_PURPLE,
    onClick: action("Click Handler"),
  },
  decorators: [
    (story) => (
      <ElWrap w={40} h={40}>
        {story()}
      </ElWrap>
    ),
  ],
};

export const PrimaryIconBtnWLM: Story = {
  args: {
    icon: <PlusIcon />,
    disable: false,
    className: BackgroundColor.WHITE,
    onClick: action("Click Handler"),
  },
  decorators: [
    (story) => (
      <ElWrap w={40} h={40}>
        {story()}
      </ElWrap>
    ),
  ],
};

export const DisableIconBtnWLM: Story = {
  args: {
    icon: <PlusIcon />,
    disable: true,
    className: BackgroundColor.WHITE,
    onClick: action("Click Handler"),
  },
  decorators: [
    (story) => (
      <ElWrap w={40} h={40}>
        {story()}
      </ElWrap>
    ),
  ],
};

export const PrimaryIconBtnPML: Story = {
  args: {
    icon: <PlusIcon />,
    disable: false,
    className: BackgroundColor.ACCENT_PURPLE,
    onClick: action("Click Handler"),
  },
  render: (args) => {
    return (
      <ElWrap w={48}>
        <IconBtnM {...args} />
      </ElWrap>
    );
  },
};

export const DisableIconBtnPML: Story = {
  args: {
    icon: <PlusIcon />,
    disable: true,
    className: BackgroundColor.ACCENT_PURPLE,
    onClick: action("Click Handler"),
  },
  render: (args) => {
    return (
      <ElWrap w={48}>
        <IconBtnM {...args} />
      </ElWrap>
    );
  },
};

export const PrimaryIconBtnWML: Story = {
  args: {
    icon: <PlusIcon />,
    disable: false,
    className: BackgroundColor.WHITE,
    onClick: action("Click Handler"),
  },
  render: (args) => {
    return (
      <ElWrap w={48}>
        <IconBtnM {...args} />
      </ElWrap>
    );
  },
};

export const DisableIconBtnWML: Story = {
  args: {
    icon: <PlusIcon />,
    disable: true,
    className: BackgroundColor.WHITE,
    onClick: action("Click Handler"),
  },
  render: (args) => {
    return (
      <ElWrap w={48}>
        <IconBtnM {...args} />
      </ElWrap>
    );
  },
};

export const PrimaryIconBtnPM: Story = {
  args: {
    icon: <PlusIcon />,
    disable: false,
    className: BackgroundColor.ACCENT_PURPLE,
    onClick: action("Click Handler"),
  },
  render: (args) => {
    return (
      <ElWrap w={32}>
        <IconBtnM {...args} />
      </ElWrap>
    );
  },
};

export const DisableIconBtnPM: Story = {
  args: {
    icon: <PlusIcon />,
    disable: true,
    className: BackgroundColor.ACCENT_PURPLE,
    onClick: action("Click Handler"),
  },
  render: (args) => {
    return (
      <ElWrap w={32}>
        <IconBtnM {...args} />
      </ElWrap>
    );
  },
};

export const PrimaryIconBtnWM: Story = {
  args: {
    icon: <PlusIcon />,
    disable: false,
    className: BackgroundColor.WHITE,
    onClick: action("Click Handler"),
  },
  render: (args) => {
    return (
      <ElWrap w={32}>
        <IconBtnM {...args} />
      </ElWrap>
    );
  },
};

export const DisableIconBtnWM: Story = {
  args: {
    icon: <PlusIcon />,
    disable: true,
    className: BackgroundColor.WHITE,
    onClick: action("Click Handler"),
  },
  render: (args) => {
    return (
      <ElWrap w={32}>
        <IconBtnM {...args} />
      </ElWrap>
    );
  },
};

export const PrimaryIconBtnS: Story = {
  args: {
    icon: <PlusIcon />,
    disable: false,
    className: BackgroundColor.WHITE,
    onClick: action("Click Handler"),
  },
  render: (args) => {
    return (
      <ElWrap w={32} h={32}>
        <IconBtnS {...args} />
      </ElWrap>
    );
  },
};

export const DisableIconBtnS: Story = {
  args: {
    icon: <PlusIcon />,
    disable: true,
    className: BackgroundColor.WHITE,
    onClick: action("Click Handler"),
  },
  render: (args) => {
    return (
      <ElWrap w={32} h={32}>
        <IconBtnS {...args} />
      </ElWrap>
    );
  },
};
