import { Stack } from '@mui/material';
import TailwindEditor from '@/pages/Interviews/Conclusion/MainScreen/Editor/Editor';

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
