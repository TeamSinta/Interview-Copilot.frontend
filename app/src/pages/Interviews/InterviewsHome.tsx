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
import { Grid, Heading, Text } from '@radix-ui/themes';
import { ContainerHome } from './StyledConclusions';
import TopNavBar from '@/components/layouts/topnavbar/TopNavBar';
import { Skeleton } from '@/components/ui/skeleton';
import emptyInterviewsImage from '@/assets/images/message_empty (1).png';
import { PersonIcon } from '@radix-ui/react-icons';
import { Layers2 } from 'lucide-react';

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
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [cookies, ,] = useCookies(['access_token']);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchInterviews = async () => {
      setLoading(true);
      try {
        const response = await getInterviews(); // Assuming getInterviews() handles the fetch
        setInterviews(response);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, [cookies.access_token]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Render loading state
  if (loading) {
    return (
      <>
        <TopNavBar />
        <ContainerHome>
          {/* Skeleton loading state */}
          <Grid
            columns={{ xs: '1', md: '2', sm: '1', lg: '3', xl: '4' }}
            gap="5"
            className="px-6 justify-around py-9 h-full"
          >
            {' '}
            <div className="flex flex-col space-y-3 py-9 px-1  ">
              <Skeleton className="h-52 w-80 rounded-xl" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="flex flex-col space-y-3 py-9 px-1  ">
              <Skeleton className="h-52 w-80  rounded-xl" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="flex flex-col space-y-3 py-9 px-1  ">
              <Skeleton className="h-52 w-80 rounded-xl" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="flex flex-col space-y-3 py-9 px-1  ">
              <Skeleton className="h-52 w-80  rounded-xl" />
            </div>
            <div className="flex flex-col space-y-3 py-9 px-1  ">
              <Skeleton className="h-52 w-80  rounded-xl" />
            </div>
          </Grid>
        </ContainerHome>
      </>
    );
  }

  // Render error or empty states
  if (error || interviews.length === 0) {
    const errorMessage =
      error?.statusCode === 401 ? (
        'Unauthorized access. Please log in.'
      ) : error?.statusCode === 404 ? (
        'Interviews not found.'
      ) : (
        <div className="flex flex-col items-center text-center	  gap-2 w-[200px]">
          <Heading size={'5'}>No Interviews yet.</Heading>
          <Text size={'1'}>Start a meeting to have a summary generated. </Text>
        </div>
      );
    return (
      <>
        <TopNavBar />
        <ContainerHome>
          <Stack spacing={3} className="px-6">
            <Box>
              <BodySMedium style={{ color: 'grey' }}>My Library</BodySMedium>
              <H1>Interviews</H1>
            </Box>
            <div className="flex items-center flex-col gap-2 h-96 justify-end ">
              <Layers2 />
              <p>{errorMessage}</p>
            </div>
          </Stack>
        </ContainerHome>
      </>
    );
  }

  // Regular content rendering
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
            gap="5"
            className="px-6 justify-around "
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
              </div>
            ))}
          </Grid>
        </Stack>
      </ContainerHome>
    </>
  );
}
