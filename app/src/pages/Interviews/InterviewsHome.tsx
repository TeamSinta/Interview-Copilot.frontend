import * as React from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';
import { H1 } from '@/components/common/typeScale/StyledTypeScale';
import ConclusionInterviewCard from '@/components/common/cards/conclusionInterivewCard/ConclusionInterviewCard';
import { useNavigate } from 'react-router-dom';
import TextIconFilter from '@/components/common/filters/textIconFilter/TextIconFilter';
import { getInterviews } from '../../features/interviews/interviewsAPI';
import { useCookies } from 'react-cookie';
import { IInterviewRound } from '@/types/interview';
import { Grid } from '@radix-ui/themes';
import { ContainerHome } from './StyledConclusions';
import TopNavBar from '@/components/layouts/topnavbar/TopNavBar';

interface TabPanelProps {
  children?: React.ReactNode;
  index: string; // Change the type to string
  value: string; // Change the type to string
  video_uri?: string[];
  thumbnail_uri?: string[];
  icon?: string;
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
  console.log(interviews);
  const [cookies, ,] = useCookies(['access_token']);

  const navigate = useNavigate();

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
      <TopNavBar />
      <ContainerHome>
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

          <Grid
            columns={{ xs: '1', md: '2', sm: '1', lg: '3', xl: '4' }}
            gap="3"
            className="px-4"
          >
            {interviews.map((interviewRound: IInterviewRound, index) => (
              <div
                onClick={() => {
                  navigate('/interviews/conclusion/', {
                    state: { id: interviewRound.id, useTimer: false },
                  });
                }}
                key={index}
              >
                <Box height="9">
                  <ConclusionInterviewCard
                    key={index}
                    title={interviewRound.candidate_name}
                    disable={false}
                    name={interviewRound.title}
                    date={interviewRound.created_at}
                    video_uri={interviewRound.video_uri}
                    thumbnail_uri={interviewRound.thumbnail_uri}
                    icon={interviewRound.icon}
                  />
                </Box>
              </div>
            ))}
          </Grid>
        </Stack>
      </ContainerHome>
    </>
  );
}
