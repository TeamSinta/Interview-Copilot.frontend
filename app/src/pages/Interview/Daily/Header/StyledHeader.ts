import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--grey);
  padding: 0.5rem 1rem;
  background-color: black;
`;

export const HeaderSpan = styled.span`
  font-size: 12px;
  font-weight: 600;
`;

export const TitleSpan = styled.span`
  padding: 0 16px;
`;

export const HeaderLink = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  color: var(--dark-blue);

  &.new-tab-link {
    border: 1px solid var(--dark-grey);
    border-radius: 8px;
  }

  &:visited {
    color: var(--dark-blue);
  }

  &:focus {
    color: var(--dark-blue);
  }

  &:active {
    color: var(--turquoise);
  }

  &:hover {
    color: var(--turquoise);
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  width: inherit;
`;

export const StyledImage = styled.img`
  width: 90px;
  min-width: 90px;
  min-height: 60px;
  max-height: 100px;
`;
