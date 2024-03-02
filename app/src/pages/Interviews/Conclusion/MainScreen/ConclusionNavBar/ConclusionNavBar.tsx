'use client';

import {
  CalendarIcon,
  HelpCircle,
  Smile,
  StarIcon,
  ThumbsDownIcon,
  ThumbsUp,
  UserCheck,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import { IconPicker } from './Icon-Picker';
import { Box, Flex, Heading, HoverCard, Text } from '@radix-ui/themes';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from '@/components/ui/select.js';
import {
  CaretDownIcon,
  PersonIcon,
  StarFilledIcon,
} from '@radix-ui/react-icons';
import { Title } from './Title';
import { useUpdateInterviewRoundMutation } from '@/features/interviews/interviewsAPISlice';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star1Icon } from '@/components/common/svgIcons/Icons';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { CheckboxReactHookFormMultiple } from './ExportForm';
import { AvatarFallback, Avatar, AvatarImage } from '@/components/ui/avatar';

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
        <Flex gap={'1'} justify={'between'} align={'center'}>
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
                <div className="flex items-center gap-x-2 mt-1 pr-1 group/icon  ">
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
          <Flex gap={'1'}>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Interviews" />
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
            <Button
              variant="link"
              className=" decoration-transparent text-gray-500"
            >
              <Text>
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <Text>{initialData?.created_at ?? ''}</Text>
                  </HoverCard.Trigger>
                  <HoverCard.Content>
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={interviewerPicture}
                          alt="@teamsinta"
                        />{' '}
                        <AvatarFallback>TS</AvatarFallback>
                      </Avatar>

                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          {' '}
                          {interviewerName}
                        </h4>
                        <p className="text-sm">{initialData.title}</p>
                        <div className="flex items-center pt-2">
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{' '}
                          <span className="text-xs text-muted-foreground">
                            {initialData?.created_at ?? ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCard.Content>
                </HoverCard.Root>{' '}
              </Text>
            </Button>
          </Flex>
        </Flex>

        <Flex style={{ alignItems: 'center', gap: '8px' }}>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                {' '}
                <HelpCircle className="mr-2 h-4 w-4" /> Decision{' '}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Submit your Decision</DialogTitle>
                <DialogDescription className="mt-5">
                  Your hiring decision is final and cannot be changed after
                  submission. Please confirm your choice.
                </DialogDescription>
              </DialogHeader>

              <ToggleGroup
                className="flex flex-col gap-2 p-2 "
                orientation={'horizontal'}
                type="single"
              >
                <div className="flex flex-item w-full gap-3">
                  <ToggleGroupItem
                    value="a"
                    className="flex-item w-full h-5/5 "
                    variant={'outline'}
                  >
                    {' '}
                    <ThumbsUp className="mr-2 h-4 w-4 stroke-green-400 h-5/5 " />{' '}
                    Hire
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    variant={'outline'}
                    className="flex-item w-full"
                    value="b"
                  >
                    {' '}
                    <ThumbsDownIcon className="mr-2 h-4 w-4 stroke-red-400" />{' '}
                    Don't Hire
                  </ToggleGroupItem>
                </div>
                <ToggleGroupItem
                  variant={'outline'}
                  className="flex-item w-full"
                  value="c"
                >
                  <StarIcon className="mr-2 h-4 w-4 stroke-green-500" /> Strong
                  Hire
                </ToggleGroupItem>
              </ToggleGroup>

              <DialogFooter>
                <Button>Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <Button>Share</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Export to PDF/DOC</DialogTitle>
                <DialogDescription>
                  Select how you want to export your summaries: PDF or DOC.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    File Type
                  </Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="PDF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Select
                  </Label>
                  <CheckboxReactHookFormMultiple />
                </div>
              </div>
              <DialogFooter>
                <Button>Export</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Flex>
      </Flex>
    </>
  );
};
