import * as React from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import { H1 } from '@/components/common/typeScale/StyledTypeScale';
import ConclusionInterviewCard from '@/components/common/cards/conclusionInterivewCard/ConclusionInterviewCard';
import { GridContainer } from './StyledConclusions';
import { useNavigate } from 'react-router-dom';
import TextIconFilter from '@/components/common/filters/textIconFilter/TextIconFilter';
import { getInterviews } from '../../features/interviews/interviewsAPI';
import { useCookies } from 'react-cookie';

interface TabPanelProps {
  children?: React.ReactNode;
  index: string; // Change the type to string
  value: string; // Change the type to string
}

interface IInterviewRound {
  title: string;
  id: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <BodySMedium>{children}</BodySMedium>
        </Box>
      )}
    </div>
  );
}

const TABS = {
  INTERVIEWS: 'interviews',
  ARCHIVED: 'archived',
};

export default function BasicTabs() {
  const [activeTab, setActiveTab] = React.useState(TABS.INTERVIEWS);
  const [interviews, setInterviews] = React.useState([]);
  const [cookies, ,] = useCookies(['access_token']);

  const navigate = useNavigate();

  console.log(interviews);
  React.useEffect(() => {
    const fetchInterviews = async () => {
      const response = await getInterviews();
      setInterviews(response);
    };

    fetchInterviews();
  }, [cookies.access_token]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Stack spacing={3}>
        <Box>
          <BodySMedium
            style={{
              color: 'grey',
            }}
          >
            My Library
          </BodySMedium>
          <H1>Interviews</H1>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              marginBottom: '24px',
              gap: '12px',
              display: 'flex',
            }}
          >
            <TextIconFilter
              label="Interviews"
              icon={false}
              select={activeTab === TABS.INTERVIEWS}
              onClick={() => handleTabChange(TABS.INTERVIEWS)}
            />
            <TextIconFilter
              label="Archived"
              icon={false}
              select={activeTab === TABS.ARCHIVED}
              onClick={() => handleTabChange(TABS.ARCHIVED)}
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
          {activeTab === TABS.INTERVIEWS && (
            <CustomTabPanel value={activeTab} index={TABS.INTERVIEWS}>
              <GridContainer>
                {interviews.map((interviewRound: IInterviewRound, index) => (
                  <div
                    onClick={() => {
                      navigate('/interviews/conclusion/', {
                        state: { id: interviewRound.id, useTimer: false },
                      });
                    }}
                    key={index}
                  >
                    <ConclusionInterviewCard
                      key={index}
                      title={interviewRound.candidate_name}
                      disable={false}
                      name={interviewRound.title}
                      date={interviewRound.created_at}
                    />
                  </div>
                ))}
              </GridContainer>
            </CustomTabPanel>
          )}
          {activeTab === TABS.ARCHIVED && (
            <CustomTabPanel
              value={activeTab}
              index={TABS.ARCHIVED}
            ></CustomTabPanel>
          )}
        </Box>
      </Stack>
    </>
  );
}
