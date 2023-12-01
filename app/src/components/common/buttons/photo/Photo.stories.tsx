import { Meta, StoryObj } from "@storybook/react";
import Photo from "./Photo";
import { action } from "@storybook/addon-actions";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { PhotoType } from "@/features/utils/utilEnum";
const photoStoryMeta = {
  title: "common/buttons/Photo",
  component: Photo,
  argTypes: {
    selected: {
      description:
        "Selection status, the default value is false for unselected." +
        " If it is selected, it will be updated to true and a checkmark will be displayed.",
      defaultValue: false,
      table: { defaultValue: { summary: false } },
    },
    onSelect: {
      description:
        "When clicked using the onClick event, if the selected value is `true`, it will be changed to `false`, " +
        "and if it is `false`, it will be changed to `true`.",
    },
    member_idx: {
      description:
        "A unique value to identify which member is selected. " +
        "By passing the idx to the Redux store through onSelect, " +
        "the store searches for the member with the same idx value and changes the selection status.",
    },
    member_name: {
      description:
        "Member name, used to display the profile screen with the initial of the name if there is no member's photo URL.",
    },
    member_url: {
      description: "Member's profile image URL.",
    },
    photoType: {
      description:
        "Specify the border-radius transformation: 32 for S and 40 for L",
      control: {
        type: "radio",
        option: [PhotoType.L, PhotoType.S],
      },
    },
  },
  decorators: [
    (Story) => (
      <ElWrap w={40} h={40}>
        {Story()}
      </ElWrap>
    ),
  ],
} as Meta<typeof Photo>;
export default photoStoryMeta;

type Story = StoryObj<typeof photoStoryMeta>;

export const PhotoL: Story = {
  args: {
    selected: false,
    onSelect: action("Click Handler"),
    member_idx: 1,
    member_firstName: "Mohamed ",
    member_lastName: "Shegow",
    member_url:
      "https://ca.slack-edge.com/T04C82XCPRU-U04D4BRG8CQ-c4ccf8605ed3-512",
    photoType: PhotoType.L,
  },
};

export const SelectedPhotoL: Story = {
  args: {
    selected: true,
    onSelect: action("Click Handler"),
    member_idx: 1,
    member_firstName: "Mohamed ",
    member_lastName: "Shegow",
    member_url:
      "https://ca.slack-edge.com/T04C82XCPRU-U04D4BRG8CQ-c4ccf8605ed3-512",
    photoType: PhotoType.L,
  },
};

export const InitialL: Story = {
  args: {
    selected: false,
    onSelect: action("Click Handler"),
    member_idx: 1,
    member_firstName: "Mohamed ",
    member_lastName: "Shegow",
    member_url: "",
    photoType: PhotoType.L,
  },
};

export const SelectedInitialL: Story = {
  args: {
    selected: true,
    onSelect: action("Click Handler"),
    member_idx: 1,
    member_firstName: "Mohamed ",
    member_lastName: "Shegow",
    member_url: "",
    photoType: PhotoType.L,
  },
};

export const PhotoS: Story = {
  args: {
    selected: false,
    onSelect: action("Click Handler"),
    member_idx: 1,
    member_firstName: "Mohamed ",
    member_lastName: "Shegow",
    member_url:
      "https://ca.slack-edge.com/T04C82XCPRU-U04D4BRG8CQ-c4ccf8605ed3-512",
    photoType: PhotoType.S,
  },
  render: (args) => {
    return (
      <ElWrap w={32} h={32}>
        <Photo {...args} />
      </ElWrap>
    );
  },
};

export const SelectedPhotoS: Story = {
  args: {
    selected: true,
    onSelect: action("Click Handler"),
    member_idx: 1,
    member_firstName: "Mohamed ",
    member_lastName: "Shegow",
    member_url:
      "https://ca.slack-edge.com/T04C82XCPRU-U04D4BRG8CQ-c4ccf8605ed3-512",
    photoType: PhotoType.S,
  },
  render: (args) => {
    return (
      <ElWrap w={32} h={32}>
        <Photo {...args} />
      </ElWrap>
    );
  },
};

export const InitialS: Story = {
  args: {
    selected: false,
    onSelect: action("Click Handler"),
    member_idx: 1,
    member_firstName: "Mohamed ",
    member_lastName: "Shegow",
    member_url: "",
    photoType: PhotoType.S,
  },
  render: (args) => {
    return (
      <ElWrap w={32} h={32}>
        <Photo {...args} />
      </ElWrap>
    );
  },
};

export const SelectedInitialS: Story = {
  args: {
    selected: true,
    onSelect: action("Click Handler"),
    member_idx: 1,
    member_firstName: "Mohamed ",
    member_lastName: "Shegow",
    member_url: "",
    photoType: PhotoType.S,
  },
  render: (args) => {
    return (
      <ElWrap w={32} h={32}>
        <Photo {...args} />
      </ElWrap>
    );
  },
};
