import styled from "styled-components";
export const NavStyles = styled.div`
  background: linear-gradient(
    168deg,
    rgb(52, 65, 121) 3.98%,
    rgb(68, 94, 208) 100%
  );
  grid-row: 1/3;
  font-size: 17px;
  padding: ${({ theme }) => theme.global.marginY};
  .Button-Container {
    display: grid;
    grid-gap: 10px;
    margin: ${({ theme }) => theme.global.marginY};
  }
`;
