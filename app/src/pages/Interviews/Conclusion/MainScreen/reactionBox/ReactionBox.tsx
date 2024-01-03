import React from 'react';
import {
  CommentButton,
  HighlightButton,
  ButtonContainer,
} from './StyledReactionBox';
import { BodySMedium } from '@/components/common/typeScale/StyledTypeScale';

export const ReactionButtonBox = () => {
  return (
    <ButtonContainer>
      <CommentButton onClick={() => console.log('Comment clicked')}>
        <span role="img" aria-label="comment">
          💬
        </span>
        <BodySMedium>Comment</BodySMedium>
      </CommentButton>
      <HighlightButton onClick={() => console.log('Highlight clicked')}>
        <span role="img" aria-label="highlight">
          😊
        </span>
        <BodySMedium>Highlight</BodySMedium>
      </HighlightButton>
    </ButtonContainer>
  );
};
