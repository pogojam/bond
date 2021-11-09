import styled from "styled-components";

export const Box = styled.div`
  background-color: #0b1c2b;
  border-radius: ${({ theme }) => theme.global.border};
  padding: ${({ theme }) => theme.box.paddingX};
`;
