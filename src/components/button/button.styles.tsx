import styled from "styled-components";

export const StyledButton = styled.div`
  position: relative;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.global.border};

  cursor: pointer;

  span {
    margin-bottom: 7%;
  }
`;

export const StyledNavButton = styled(StyledButton)`
  display: flex;
  justify-content: flex-start;

  svg {
    padding-right: 10px;
  }
`;
export const StyledCircleButton = styled(StyledButton)`
  color: #ff0000;
  width: 60px;
  height: 60px;
`;

export const StyledDashButton = styled(StyledButton)`
  background-color: rgba(42, 59, 80, 1);
  padding: ${({ theme }) => theme.global.borderXL};
  border-radius: ${({ theme }) => theme.global.border};
`;
