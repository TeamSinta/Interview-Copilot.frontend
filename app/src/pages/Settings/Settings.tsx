import { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { BodySMedium, H1 } from '@/components/common/typeScale/StyledTypeScale';
import TextIconFilter from '@/components/common/filters/textIconFilter/TextIconFilter';
import { SettingsContainer, PageContainer } from './StyledSettings';
import MemberTab from '@/components/pages/settings/memberTab/MemberTab';
import { TABS } from '@/features/utils/utilEnum';
import UserTab from '@/components/pages/settings/Profiletab/UserTab';
import DepartmentTab from '@/components/pages/settings/departmentsTab/DepartmentTab';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(TABS.PROFILE);
  const workspace = useSelector((state: RootState) => state.workspace);

  const handleTabChange = (tab: TABS) => {
    setActiveTab(tab);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <BodySMedium
          style={{
            color: 'grey',
          }}
        >
          {workspace.name}
        </BodySMedium>
        <H1>Settings</H1>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '12px',
        }}
      >
        <TextIconFilter
          label="Profile"
          icon={false}
          select={activeTab === 'profile'}
          onClick={() => handleTabChange(TABS.PROFILE)}
        />

        <TextIconFilter
          label="Members"
          icon={false}
          select={activeTab === 'members'}
          onClick={() => handleTabChange(TABS.MEMBERS)}
        />

        <TextIconFilter
          label="Departments"
          icon={false}
          select={activeTab === 'departments'}
          onClick={() => handleTabChange(TABS.DEPARTMENTS)}
        />
      </Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          padding: '2px',
          gap: '12px',
          display: 'flex',
          marginBottom: '24px',
        }}
      ></Box>
      <PageContainer>
        {activeTab === TABS.PROFILE && <UserTab />}
        {activeTab === TABS.MEMBERS && <MemberTab />}
        {activeTab === TABS.DEPARTMENTS && <DepartmentTab />}
      </PageContainer>
    </Stack>
  );
};

export default SettingsPage;
