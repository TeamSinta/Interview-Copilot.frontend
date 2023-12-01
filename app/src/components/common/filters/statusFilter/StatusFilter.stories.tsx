import { type Meta, type StoryObj } from "@storybook/react";

import StatusFilter from "./StatusFilter";
import { StatusDropdownFilter } from "@/features/utils/utilEnum";

const meta = {
  title: "common/filters/StatusFilter",
  component: StatusFilter,
  argTypes: {},
} as Meta<typeof StatusFilter>;
export default meta;

type Story = StoryObj<typeof meta>;

export const PrimaryStatusFilter: Story = {
  args: {
    status: null,
  },
};

export const ActiveStatusFilter: Story = {
  args: {
    status: StatusDropdownFilter.ACTIVE,
  },
};

export const WaitingStatusFilter: Story = {
  args: {
    status: StatusDropdownFilter.WAITING,
  },
};

export const ClosedStatusFilter: Story = {
  args: {
    status: StatusDropdownFilter.CLOSED,
  },
};
