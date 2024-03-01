import styled from 'styled-components';

export const H1 = styled.h1`
  font-family: 'InterSemi';
  font-size: 32px;
  font-weight: 600;
  line-height: 125%;
`;

export const H2Bold = styled.h2`
  font-family: 'InterSemi';
  font-size: 24px;
  font-weight: 600;
  line-height: 125%;
`;

export const H2Medium = styled(H2Bold)`
  font-family: 'InterMedium';
  font-size: 24px;
  font-weight: 500;
  line-height: 125%;
`;

export const H3Bold = styled.h3`
  font-family: 'InterSemi';
  font-size: 20px;
  font-weight: 600;
  line-height: 125%;
`;

export const H3Medium = styled(H3Bold)`
  font-family: 'Inter';

`;

export const BodyLBold = styled.div`
  font-family: 'InterSemi';
  font-size: 16px;
  line-height: 150%;
  font-weight: 600;
`;

export const BodyLSemiBold = styled(BodyLBold)`
  font-family: 'Inter';
`;

export const BodyLMedium = styled(BodyLBold)`
  font-family: 'Inter';
  font-weight: 500;
`;

export const BodyMBold = styled(BodyLBold)`
  font-size: 14px;
`;

export const BodyMSemiBold = styled(BodyLBold)`
  font-size: 14px;
`;

export const BodyMMedium = styled(BodyLMedium)`
  font-size: 14px;
  width: fit-content;
  &.customStyleCompetenctText {
    overflow: hidden;
  }
`;

export const BodySBold = styled(BodyLBold)`
  font-size: 12px;
`;

export const BodySMedium = styled(BodyLMedium)`
  font-size: 12px;
`;

export const TypeScleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 400px;
`;
