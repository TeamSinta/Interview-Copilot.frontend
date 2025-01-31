import React, { useEffect, useState } from 'react';
import {
  StyledIconBtnM,
  StyledIconSVG,
  StyledRatingBtnL,
} from '@/components/common/buttons/button/StyledBtn';
import ElWrap from '@/components/layouts/elWrap/ElWrap';
import { ICustomIconProps } from '@/components/common/svgIcons/CustomIcons';
import {
  DislikeIcon,
  NeutralIcon,
  WrongIcon,
  LikeIcon,
  TopStarIcon,
} from '@/components/common/svgIcons/Icons';
import { Grid } from '@mui/material';
import { QuestionMeta } from '../Tabs/QuestionTabQNA';

interface RatingButtonProps extends ICustomIconProps {
  Icon: React.FunctionComponent;
  activeColor?: string;
  activeIcon: boolean;
}

export interface PredefinedRatingsProps {
  rating: number;
}

export const buttons = [
  { Icon: WrongIcon, color: '#FABBCF', rate: 1 },
  { Icon: DislikeIcon, color: '#FABBCF', rate: 2 },
  { Icon: NeutralIcon, color: '#FFFABF', rate: 3 },
  { Icon: LikeIcon, color: '#DBFDDC', rate: 4 },
  { Icon: TopStarIcon, color: '#DBFDDC', rate: 5 },
];

export const RatingButton: React.FC<RatingButtonProps> = ({
  activeIcon,
  Icon,
  activeColor = '',
}) => {
  return (
    <div className="flex items-center width ">
      <StyledIconSVG>
        <Icon />
      </StyledIconSVG>
    </div>
  );
};

export const WrongButtonL = (props: ICustomIconProps): JSX.Element => {
  const { active } = props;
  if (active === 1) {
    return (
      <div style={{ marginRight: '5px' }}>
        {' '}
        <ElWrap w={40}>
          <StyledRatingBtnL
            style={{
              background: '#FABBCF',
              boxShadow: 'none',
              outline: '1.7px solid black',
              outlineOffset: '-1',
            }}
          >
            <WrongIcon />
          </StyledRatingBtnL>
        </ElWrap>
      </div>
    );
  } else {
    return (
      <div style={{ marginRight: '5px' }}>
        <ElWrap w={40}>
          <StyledRatingBtnL
            style={{ outline: '1.7px solid black', outlineOffset: '-1' }}
          >
            <WrongIcon />
          </StyledRatingBtnL>
        </ElWrap>
      </div>
    );
  }
};

export const DislikeButtonL = (props: ICustomIconProps): JSX.Element => {
  const { active } = props;
  if (active === 2) {
    return (
      <div style={{ marginRight: '5px' }}>
        <ElWrap w={40}>
          <StyledRatingBtnL
            style={{
              background: '#FABBCF',
              boxShadow: 'none',
              outline: '1.7px solid black',
              outlineOffset: '-1',
            }}
          >
            <DislikeIcon />
          </StyledRatingBtnL>
        </ElWrap>
      </div>
    );
  } else {
    return (
      <div style={{ marginRight: '5px' }}>
        {' '}
        <ElWrap w={40}>
          <StyledRatingBtnL
            style={{ outline: '1.7px solid black', outlineOffset: '-1' }}
          >
            <DislikeIcon />
          </StyledRatingBtnL>
        </ElWrap>
      </div>
    );
  }
};

export const NeutralButtonL = (props: ICustomIconProps): JSX.Element => {
  const { active } = props;
  if (active === 3) {
    return (
      <div style={{ marginRight: '5px' }}>
        {' '}
        <ElWrap w={40}>
          <StyledRatingBtnL
            style={{
              background: '#FFFABF',
              boxShadow: 'none',
              outline: '1.7px solid black',
              outlineOffset: '-1',
            }}
          >
            <NeutralIcon />
          </StyledRatingBtnL>
        </ElWrap>
      </div>
    );
  } else {
    return (
      <div style={{ marginRight: '5px' }}>
        {' '}
        <ElWrap w={40}>
          <StyledRatingBtnL
            style={{ outline: '1.7px solid black', outlineOffset: '-1' }}
          >
            <NeutralIcon />
          </StyledRatingBtnL>
        </ElWrap>
      </div>
    );
  }
};

export const LikeButtonL = (props: ICustomIconProps): JSX.Element => {
  const { active } = props;
  if (active === 4) {
    return (
      <div style={{ marginRight: '5px' }}>
        <ElWrap w={40}>
          <StyledRatingBtnL
            style={{
              background: '#DBFDDC',
              boxShadow: 'none',
              outline: '1.7px solid black',
              outlineOffset: '-1',
            }}
          >
            <LikeIcon />
          </StyledRatingBtnL>
        </ElWrap>
      </div>
    );
  } else {
    return (
      <div style={{ marginRight: '5px' }}>
        {' '}
        <ElWrap w={40}>
          <StyledRatingBtnL
            style={{ outline: '1.7px solid black', outlineOffset: '-1' }}
          >
            <LikeIcon />
          </StyledRatingBtnL>
        </ElWrap>
      </div>
    );
  }
};

export const TopStarButtonL = (props: ICustomIconProps): JSX.Element => {
  const { active } = props;
  if (active === 5) {
    return (
      <ElWrap w={40}>
        <StyledRatingBtnL
          style={{
            background: '#DBFDDC',
            boxShadow: 'none',
            outline: '1.7px solid black',
            outlineOffset: '-1',
          }}
        >
          <TopStarIcon />
        </StyledRatingBtnL>
      </ElWrap>
    );
  } else {
    return (
      <ElWrap w={40}>
        <StyledRatingBtnL
          style={{ outline: '1.7px solid black', outlineOffset: '-1' }}
        >
          <TopStarIcon />
        </StyledRatingBtnL>
      </ElWrap>
    );
  }
};

export const RatingComponent: React.FC<any> = ({
  question,
  setRating,
  rating,
  interviewRoundId,
}) => {
  const [activeTab, setActiveTab] = useState<any>(null);

  const handleRating = (rate: any) => {
    setActiveTab(rate);
    setRating(rate, question);
  };

  React.useEffect(() => {
    // getInterviewRoundQuestion();
  }, [interviewRoundId]);

  return (
    <div style={{ display: 'flex', margin: '0px' }}>
      {buttons.map(({ Icon, color, rate }) => (
        <span onClick={() => handleRating(rate)}>
          <RatingButton
            activeIcon={activeTab === rate}
            Icon={Icon}
            activeColor={color}
            width={0}
            height={0}
            active={0}
          />
        </span>
      ))}
    </div>
  );
};

export function RatingComponentL({
  question,
  rating: propRating,
  onUpdateRating,
  id,
  width = 0,
  height = 0,
}: Props) {
  const [activeTab, setActiveTab] = useState(propRating);

  useEffect(() => {
    setActiveTab(propRating);
  }, [propRating]);

  const handleRating = (rate: number) => {
    setActiveTab(rate);
    onUpdateRating(rate); // Trigger the callback to update the rating in the parent component
  };

  return (
    <div
      style={{
        display: 'flex',
        marginLeft: '4px',
        gap: '16px',
        marginRight: '0.5%',
        justifyContent: 'flex-start',
      }}
    >
      <ElWrap w={35}>
        <StyledIconBtnM>
          <span onClick={() => handleRating(1)}>
            <WrongButtonL width={width} height={height} active={activeTab} />
          </span>{' '}
        </StyledIconBtnM>
      </ElWrap>

      <ElWrap w={35}>
        <StyledIconBtnM>
          <span onClick={() => handleRating(2)}>
            <DislikeButtonL width={width} height={height} active={activeTab} />
          </span>{' '}
        </StyledIconBtnM>{' '}
      </ElWrap>

      <ElWrap w={35}>
        <StyledIconBtnM>
          <span onClick={() => handleRating(3)}>
            <NeutralButtonL width={width} height={height} active={activeTab} />
          </span>{' '}
        </StyledIconBtnM>{' '}
      </ElWrap>
      <ElWrap w={35}>
        <StyledIconBtnM>
          <span onClick={() => handleRating(4)}>
            <LikeButtonL width={width} height={height} active={activeTab} />
          </span>{' '}
        </StyledIconBtnM>{' '}
      </ElWrap>
      <ElWrap w={35}>
        <StyledIconBtnM>
          <span onClick={() => handleRating(5)}>
            <TopStarButtonL width={width} height={height} active={activeTab} />
          </span>
        </StyledIconBtnM>
      </ElWrap>
    </div>
  );
}

export const PredefinedRatingsAndCompetency: React.FC<any> = ({
  competency,
  rating,
  duration,
  difficulty,
}) => {
  const getCompetencyStyle = (rating: string) => {
    return {
      borderRadius: '10px',
      backgroundColor: 'white',
      padding: '8px 16px',
      border: '1px solid #121212',
      fontSize: '10px',
      gap: '10px',
    };
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'stretch',
        width: '100%',
        alignItems: 'center',
        padding: '0px 8px',
      }}
    >
      <Grid xs={12} md={4}>
        <div>
          <span style={getCompetencyStyle(rating)}>{competency}</span>{' '}
        </div>
      </Grid>
      {difficulty !== null && duration !== null && (
        <Grid xs={12} md={4}>
          <QuestionMeta duration={duration} difficulty={difficulty} />
        </Grid>
      )}
      <Grid xs={12} md={4}>
        <div className="container">
          {' '}
          <div className="icon">
            <PredefinedRatingsComponent rating={rating} />{' '}
          </div>
        </div>
      </Grid>
    </div>
  );
};

export const PredefinedRatingsComponent: React.FC<PredefinedRatingsProps> = ({
  rating,
}) => {
  return (
    <div>
      {buttons
        .filter(({ rate }) => rating === rate) // Filter buttons to only those with matching rate
        .map(({ Icon, color, rate }) => (
          <span key={rate}>
            <RatingButton
              Icon={Icon}
              activeColor={color}
              activeIcon={rating === rate}
            />
          </span>
        ))}
    </div>
  );
};
