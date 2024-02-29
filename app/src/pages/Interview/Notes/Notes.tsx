import { Stack } from '@mui/material';

import TailwindEditor from '@/pages/Interviews/Conclusion/MainScreen/Editor/Editor';

function Notes() {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      style={{ height: '100%' }}
    >
      <TailwindEditor />
    </Stack>
  );
}

export default Notes;
