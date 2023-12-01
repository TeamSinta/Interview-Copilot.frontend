import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { BackgroundColor } from "@/features/utils/utilEnum";
import { type Meta, type StoryObj } from "@storybook/react";
import { TextBtnL, TextBtnM, TextBtnS } from "./TextBtn";

const meta = {
  title: "common/buttons/TextBtn",
  component: TextBtnL,
  argTypes: {
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
  },
} as Meta<typeof TextBtnL>;
export default meta;

type Story = StoryObj<typeof meta>;

export const PrimaryTextBtnPLL: Story = {
  args: {
    label: "Create",
    disable: false,
    className: BackgroundColor.ACCENT_PURPLE,
  },
  decorators: [(story) => <ElWrap w={223}>{story()}</ElWrap>],
};

export const DisableTextBtnPLL: Story = {
  args: {
    label: "Create",
    disable: true,
    className: BackgroundColor.ACCENT_PURPLE,
  },
  decorators: [(story) => <ElWrap w={223}>{story()}</ElWrap>],
};

export const PrimaryTextBtnWLL: Story = {
  args: {
    label: "Create",
    disable: false,
    className: BackgroundColor.WHITE,
  },
  decorators: [(story) => <ElWrap w={223}>{story()}</ElWrap>],
};

export const DisableTextBtnWLL: Story = {
  args: {
    label: "Create",
    disable: true,
    className: BackgroundColor.WHITE,
  },
  decorators: [(story) => <ElWrap w={223}>{story()}</ElWrap>],
};

export const PrimaryTextBtnPL: Story = {
  args: {
    label: "Create",
    disable: false,
    className: BackgroundColor.ACCENT_PURPLE,
  },
  decorators: [(story) => <ElWrap w={119}>{story()}</ElWrap>],
};

export const DisableTextBtnPL: Story = {
  args: {
    label: "Create",
    disable: true,
    className: BackgroundColor.ACCENT_PURPLE,
  },
  decorators: [(story) => <ElWrap w={119}>{story()}</ElWrap>],
};

export const PrimaryTextBtnWL: Story = {
  args: {
    label: "Create",
    disable: false,
    className: BackgroundColor.WHITE,
  },
  decorators: [(story) => <ElWrap w={119}>{story()}</ElWrap>],
};

export const DisableTextBtnWL: Story = {
  args: {
    label: "Create",
    disable: true,
    className: BackgroundColor.WHITE,
  },
  decorators: [(story) => <ElWrap w={119}>{story()}</ElWrap>],
};

export const PrimaryTextBtnPM: Story = {
  args: {
    label: "Create",
    disable: false,
    className: BackgroundColor.ACCENT_PURPLE,
  },
  render: (args) => {
    return (
      <ElWrap w={84}>
        <TextBtnM {...args} />
      </ElWrap>
    );
  },
};

export const DisableTextBtnPM: Story = {
  args: {
    label: "Create",
    disable: true,
    className: BackgroundColor.ACCENT_PURPLE,
  },
  render: (args) => {
    return (
      <ElWrap w={84}>
        <TextBtnM {...args} />
      </ElWrap>
    );
  },
};

export const PrimaryTextBtnWM: Story = {
  args: {
    label: "Create",
    disable: false,
    className: BackgroundColor.WHITE,
  },
  render: (args) => {
    return (
      <ElWrap w={84}>
        <TextBtnM {...args} />
      </ElWrap>
    );
  },
};

export const DisableTextBtnWM: Story = {
  args: {
    label: "Create",
    disable: true,
    className: BackgroundColor.WHITE,
  },
  render: (args) => {
    return (
      <ElWrap w={84}>
        <TextBtnM {...args} />
      </ElWrap>
    );
  },
};

export const PrimaryTextBtnS: Story = {
  args: {
    label: "No, leave them",
    disable: false,
  },
  render: (args) => {
    return (
      <ElWrap w={153} h={38}>
        <TextBtnS {...args} />
      </ElWrap>
    );
  },
};

export const DisableTextBtnS: Story = {
  args: {
    label: "No, leave them",
    disable: true,
  },
  render: (args) => {
    return (
      <ElWrap w={153} h={38}>
        <TextBtnS {...args} />
      </ElWrap>
    );
  },
};
