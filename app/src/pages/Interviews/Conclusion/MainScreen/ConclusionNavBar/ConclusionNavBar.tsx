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
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

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
  DialogClose,
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
import useExportToPdf from '@/hooks/useExportToPdf';

interface ToolbarProps {
  interviewData: any;
  preview?: boolean;
  interviewerPicture: any;
  interviewerName: any;
}
export const ConclusionToolbar = ({
  interviewData,
  interviewerPicture,
  interviewerName,
  preview,
}: ToolbarProps) => {
  const { exportInterviewPdf } = useExportToPdf();
  const [update, { isLoading }] = useUpdateInterviewRoundMutation();
  const removeIcon = '';

  const onIconSelect = (icon: string) => {
    update({
      id: interviewData.id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    // console.log('remove');
    // removeIcon({
    //   id: interviewData._id,
    // });
  };

  const handleExportClick = async () => {
    await exportInterviewPdf(interviewData.id);
  };

  return (
    <>
      <Flex
        justify={'between'}
        className=" bg-white py-2.5 px-5 shadow min-h-[80px] group"
      >
        <Flex gap={'1'} justify={'between'} align={'center'}>
          <Flex gap={'1'}>
            <div className="py-1 gap-x-1">
              {!interviewData.icon && (
                <IconPicker asChild onChange={onIconSelect}>
                  <Button
                    className="text-xs text-muted-foreground"
                    variant="outline"
                    size="sm"
                  >
                    <Smile className="w-4 h-4 mr-2" />
                    Add icon
                  </Button>
                </IconPicker>
              )}
            </div>
            <div className="">
              {!!interviewData?.icon && (
                <div className="flex items-center pr-1 mt-1 gap-x-2 group/icon ">
                  <IconPicker onChange={onIconSelect}>
                    <p className="text-3xl transition hover:opacity-75">
                      {interviewData.icon}
                    </p>
                  </IconPicker>
                  {/* /code to remove button icon */}
                  {/* <Button
                  onClick={onRemoveIcon}
                  className="text-xs transition rounded-full opacity-0 group-hover/icon:opacity-100 text-muted-foreground"
                  variant="outline"
                  size="icon"
                >
                  <X className="w-4 h-4" />
                </Button> */}
                </div>
              )}
            </div>
            <Title interviewData={interviewData} />
          </Flex>
          <Flex gap={'1'}>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Interviews" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Interviews</SelectLabel>
                  <SelectItem value="light">{interviewData.title}</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              variant="link"
              className="text-gray-500 decoration-transparent"
            >
              <Text>
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <Text>{interviewData?.created_at ?? ''}</Text>
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
                        <p className="text-sm">{interviewData.title}</p>
                        <div className="flex items-center pt-2">
                          <CalendarIcon className="w-4 h-4 mr-2 opacity-70" />{' '}
                          <span className="text-xs text-muted-foreground">
                            {interviewData?.created_at ?? ''}
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
                <HelpCircle className="w-4 h-4 mr-2" /> Decision{' '}
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
                <div className="flex w-full gap-3 flex-item">
                  <ToggleGroupItem
                    value="a"
                    className="w-full flex-item h-5/5 "
                    variant={'outline'}
                  >
                    {' '}
                    <ThumbsUp className="w-4 h-4 mr-2 stroke-green-400 h-5/5 " />{' '}
                    Hire
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    variant={'outline'}
                    className="w-full flex-item"
                    value="b"
                  >
                    {' '}
                    <ThumbsDownIcon className="w-4 h-4 mr-2 stroke-red-400" />{' '}
                    Don't Hire
                  </ToggleGroupItem>
                </div>
                <ToggleGroupItem
                  variant={'outline'}
                  className="w-full flex-item"
                  value="c"
                >
                  <StarIcon className="w-4 h-4 mr-2 stroke-green-500" /> Strong
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
                <div className="grid items-center grid-cols-4 gap-4">
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
                {/* <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="username" className="text-right">
                    Select
                  </Label>
                  <CheckboxReactHookFormMultiple />
                </div> */}
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button onClick={() => handleExportClick()}>Export</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Flex>
      </Flex>
    </>
  );
};
