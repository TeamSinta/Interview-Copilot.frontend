import React from 'react';
import styled from 'styled-components';
import image from '@/assets/svg/Rocket.svg';
import {
  BodyMMedium,
  H2Medium,
} from '@/components/common/typeScale/StyledTypeScale';

// Styled components
const PageContainer = styled.div`
  text-align: center;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;

  height: 60vh;
`;

const Image = styled.img`
  max-width: 250px;
  height: auto;
  border-radius: 16px;
`;

const Heading = styled(H2Medium)`
  color: #333;
  margin: 10px 0 16px 0;
`;

const BodyText = styled(BodyMMedium)`
  color: #666;
  max-width: 400px;
`;

// Component
const NotificationsPage = () => {
  return (
    <PageContainer>
      <Image src={image} alt="Coming Soon" />
      <Heading>Coming Soon</Heading>
      <BodyText>
        Sign up for our mailing list to be first to be aware when this feature
        is released.
      </BodyText>
    </PageContainer>
  );
};

export default NotificationsPage;
