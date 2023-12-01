import { Meta, StoryObj } from "@storybook/react";
import TextIconFilter from "./TextIconFilter";
import { CardIcon, HambergerIcon } from "../../svgIcons/Icons";

const icons = {
  Card: <CardIcon />,
  List: <HambergerIcon />,
};

const meta = {
  title: "common/filters/TextIconFilter",
  component: TextIconFilter,
  argTypes: {
    icon: {
      control: { type: "select" },
      options: Object.keys(icons),
      mapping: {
        ...icons,
      },
    },
  },
} as Meta<typeof TextIconFilter>;
export default meta;

type Story = StoryObj<typeof meta>;

export const TextIconFilterCard: Story = {
  args: {
    label: "Cards",
    icon: <CardIcon />,
    select: false,
  },
};

export const SelectedTextIconFilterCard: Story = {
  args: {
    label: "Cards",
    icon: <CardIcon />,
    select: true,
  },
};

export const TextIconFilterList: Story = {
  args: {
    label: "List",
    icon: <HambergerIcon />,
    select: false,
  },
};

export const SelectedTextIconFilterList: Story = {
  args: {
    label: "List",
    icon: <HambergerIcon />,
    select: true,
  },
};
