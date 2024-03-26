import { Stack } from '@mui/material';
import TailwindEditor from '@/pages/Interviews/Conclusion/MainScreen/Editor/Editor';
import { InputLabelDiv } from '@/components/pages/interview/overview_detail/StyledOverviewDetail';
import Chat from '@/components/common/form/chatBox/ChatBox';
import { IconBtnL } from '@/components/common/buttons/iconBtn/IconBtn';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addNote } from '@/features/interviews/notesSlice';

type Comment = {
  timestamp: string;
  timeDelta: string;
  comment: string;
};

function Notes(props: any) {
  const { notesInfo } = props;

  return (
    <Stack
      className="h-full px-3"
      direction="column"
      justifyContent="space-between"
    >
      <TailwindEditor
        propData={notesInfo?.description ?? ''} // Pass the description from notesInfo
        editorId={'notesEditor'}
        saveApiEndpoint={notesInfo?.saveApiEndpoint ?? ''} // Pass the saveApiEndpoint from notesInfo
        requestName={'Notes text'}
        showSaveStatus={false}
      />
    </Stack>
  );
}

export default Notes;
