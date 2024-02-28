'use client';

import { Smile, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { IconPicker } from './Icon-Picker';
import { Avatar, Box, Flex, Heading, HoverCard, Text } from '@radix-ui/themes';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from '@/components/ui/select.js';
import { CaretDownIcon, PersonIcon } from '@radix-ui/react-icons';
import { Title } from './Title';
import { useUpdateInterviewRoundMutation } from '@/features/interviews/interviewsAPISlice';

interface ToolbarProps {
  initialData: any;
  preview?: boolean;
  interviewerPicture: any;
  interviewerName: any;
}

export const ConclusionToolbar = ({
  initialData,
  interviewerPicture,
  interviewerName,
  preview,
}: ToolbarProps) => {
  const [update, { isLoading }] = useUpdateInterviewRoundMutation();
  const removeIcon = console.log('here');

  const onIconSelect = (icon: string) => {
    update({
      id: initialData.id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    console.log('remove');
    // removeIcon({
    //   id: initialData._id,
    // });
  };

  return (
    <>
      <Flex
        justify={'between'}
        className=" bg-white py-2.5 px-5 shadow min-h-[80px] group"
      >
        <Flex gap={'9'} justify={'between'} align={'center'}>
          <Flex gap={'1'}>
            <div className="gap-x-1 py-1">
              {!initialData.icon && (
                <IconPicker asChild onChange={onIconSelect}>
                  <Button
                    className="text-muted-foreground text-xs"
                    variant="outline"
                    size="sm"
                  >
                    <Smile className="h-4 w-4 mr-2" />
                    Add icon
                  </Button>
                </IconPicker>
              )}
            </div>
            <div className="">
              {!!initialData?.icon && (
                <div className="flex items-center gap-x-2 group/icon  ">
                  <IconPicker onChange={onIconSelect}>
                    <p className="text-3xl hover:opacity-75 transition">
                      {initialData.icon}
                    </p>
                  </IconPicker>
                  {/* /code to remove button icon */}
                  {/* <Button
                  onClick={onRemoveIcon}
                  className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
                  variant="outline"
                  size="icon"
                >
                  <X className="h-4 w-4" />
                </Button> */}
                </div>
              )}
            </div>
            <Title initialData={initialData} />
          </Flex>
          <Flex gap={'3'}>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Interviews</SelectLabel>
                  <SelectItem value="light">{initialData.title}</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant="outline" radius={'large'}>
              <Text>
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <Text>{initialData?.created_at ?? ''}</Text>
                  </HoverCard.Trigger>
                  <HoverCard.Content>
                    <Flex gap="4">
                      <Avatar
                        size="3"
                        fallback="R"
                        radius="full"
                        src={interviewerPicture}
                      />
                      <Box>
                        <Heading size="3" as="h3">
                          {interviewerName}
                        </Heading>
                        <Text>{initialData.title}</Text>
                      </Box>
                    </Flex>
                  </HoverCard.Content>
                </HoverCard.Root>{' '}
              </Text>
            </Button>
          </Flex>
        </Flex>

        <Flex style={{ alignItems: 'center' }}>
          <Button>
            {' '}
            <PersonIcon className="mr-2 h-4 w-4" /> Decision{' '}
            <CaretDownIcon width="16" height="16" />
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
