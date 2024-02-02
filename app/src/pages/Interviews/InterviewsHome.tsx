import ConclusionInterviewCard from "@/components/common/cards/conclusionInterivewCard/ConclusionInterviewCard";
import TextIconFilter from "@/components/common/filters/textIconFilter/TextIconFilter";
import { BodySMedium, H1 } from "@/components/common/typeScale/StyledTypeScale";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { interviewType, useGetInterviewsQuery } from "../../features/interviews/interviewsAPI";
import { GridContainer } from "./StyledConclusions";
interface TabPanelProps {
  children?: React.ReactNode;
  index: string; // Change the type to string
  value: string; // Change the type to string
  video_uri?: string[] | interviewType[];
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
  const [interviews, setInterviews] = React.useState<interviewType[]>([]);

  const navigate = useNavigate();
  const {
    data: interview,
    isSuccess,
  } = useGetInterviewsQuery();

  React.useEffect(() => {
    if (isSuccess) {
      setInterviews(interview as interviewType[]);
    }
  }, [isSuccess, interview]);

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
            <CustomTabPanel
              value={activeTab}
              index={TABS.INTERVIEWS}
              video_uri={interviews}
            >
              <GridContainer>
                {interviews.map((interviewRound: interviewType, index : number) => (
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
