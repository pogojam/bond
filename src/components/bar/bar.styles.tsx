import styled from "styled-components";

export const BarStyles = styled.div`
  display: flex;
  grid-column: 2/3;
  justify-content: flex-end;
  padding: ${({ theme }) =>
    `${theme.global.marginY} ${theme.global.marginX} ${theme.global.marginY} ${theme.global.marginX}`};

  padding-left: ${({ theme }) => theme.global.margin};

  button {
    margin-left: ${({ theme }) => theme.buttons.margin};
    margin-right: ${({ theme }) => theme.buttons.margin};
    font-size: ${({ theme }) => theme.buttons.fontLarge};
    font-family: "Comfortaa", cursive;
    height: 40px;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.light1};
    border: 2px solid;
  }
`;
