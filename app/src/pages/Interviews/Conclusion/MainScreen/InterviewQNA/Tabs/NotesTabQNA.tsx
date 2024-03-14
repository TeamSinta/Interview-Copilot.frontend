import React from 'react';
import { Divider, Grid, Stack } from '@mui/material';

import styled from 'styled-components';

import {
  BodyMBold,
  BodySMedium,
} from '@/components/common/typeScale/StyledTypeScale';

interface NoteData {
  id: number;
  note: string;
  reaction: string | null;
  time: string | null;
  created_at: string;
  updated_at: string;
  user: number;
  interview_round: number;
  question_text: number | null;
}

interface TranscriptionTabQNAProps {
  activeIndex: number;
  data: NoteData[];
  handleClick: (index: number) => void;
}

const MarginTop = styled.div`
  margin-top: 10px;
  margin-left: 5px;
`;
const IndexContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const IndexStyle = styled.div`
  border-radius: 5px;
  background-color: #f1f5ff;
  padding: 8px 16px;
  font-size: 10px;
  margin-right: 10px;
`;

export const NotesTabQNA: React.FC<TranscriptionTabQNAProps> = ({
  activeIndex,
  data,
  handleClick,
}) => {
  const categorizedNotes = data.reduce((acc, note) => {
    const category = note.question_text || 'General Notes';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(note);
    return acc;
  }, {});

  // Ensure General Notes are displayed first
  const orderedCategories = Object.keys(categorizedNotes).sort((a, b) => {
    if (a === 'General Notes') return -1;
    if (b === 'General Notes') return 1;
    return 0;
  });

  const reactionEmojis = {
    1: '🔥',
    2: '👍',
    3: '👎',
    4: '❤️',
    5: '😂',
  };

  return (
    <div>
      <Stack
        direction="column"
        spacing={5}
        alignItems={'flex-start'}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        {orderedCategories.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <IndexContainer>
              {/* Assign index only to categories other than General Notes */}
              {category !== 'General Notes' && (
                <IndexStyle>
                  <BodyMBold>{categoryIndex}</BodyMBold>
                </IndexStyle>
              )}
              <BodyMBold>
                {category !== 'General Notes' ? `${category}` : 'General Notes'}
              </BodyMBold>
            </IndexContainer>
            {categorizedNotes[category].map((note, index) => (
              <Stack
                key={index}
                direction={'row'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                spacing={3}
                style={{ width: '100%' }}
              >
                <BodySMedium
                  style={{
                    color: 'var(--Black-main, rgba(32, 14, 50, 0.50)',
                  }}
                >
                  {note.time}
                </BodySMedium>
                <BodySMedium>
                  {note.note ? (
                    note.note
                  ) : (
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <BodySMedium style={{ color: '#938f8f' }}>
                        Reacted with:
                      </BodySMedium>
                      {reactionEmojis[note.reaction]}
                    </div>
                  )}
                </BodySMedium>
              </Stack>
            ))}
          </div>
        ))}
      </Stack>
    </div>
  );
};
