import styled from "styled-components";

export const CustomSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow: scroll;
`;

export const SliderButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin: 0 10px;
`;

export const SliderContent = styled.div`
  display: flex;
  overflow: scroll;
  gap: 14px;
`;
