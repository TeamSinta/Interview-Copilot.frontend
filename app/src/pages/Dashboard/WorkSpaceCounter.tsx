import React from "react";
import styled from "styled-components";

// Define the TypeScript interfaces for the component props
interface WorkspaceItem {
  label: string;
  value: string;
}

interface WorkspaceProps {
  title: string;
  items: WorkspaceItem[];
  buttonText: string;
}

// Styled-components
const WorkspaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 8px;

  width: 100%;
`;

const WorkspaceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 18px;
  color: #333333;
  margin: 0;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 8px 0;
  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-size: 14px;
  color: #666666;
`;

const Value = styled.span`
  font-size: 14px;
  color: #333333;
`;

const Workspace: React.FC<WorkspaceProps> = ({ title, items, buttonText }) => {
  return (
    <WorkspaceContainer>
      <WorkspaceHeader></WorkspaceHeader>
      <ItemList>
        {items.map((item, index) => (
          <Item key={index}>
            <Label>{item.label}</Label>
            <Value>{item.value}</Value>
          </Item>
        ))}
      </ItemList>
    </WorkspaceContainer>
  );
};

export default Workspace;
