// ButtonBoxStyles.ts
import { StyledButton } from '@/components/common/buttons/button/StyledBtn';
import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px; // Adjust the gap between buttons as needed
  padding: 8px; // Add padding to the container if necessary
  // Add other styles for the container if needed
  width: 100%;
  flex: 1;
`;

export const Button = styled(StyledButton)`
  padding: 8px 16px;
  border: none;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 10px; // Rounded borders
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Soft shadow for depth
  font-size: 1rem;
  width: 100%;
  height: 48px;
  flex: 1;
  outline: none;
  // Add any other common button styles here
`;

export const CommentButton = styled(Button)`
  // Add specific styles for the comment button if necessary
`;

export const HighlightButton = styled(Button)`
  // Add specific styles for the highlight button if necessary
`;
