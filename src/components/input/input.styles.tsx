import styled, { css } from "styled-components";

const SharedInputCss = css``;

export const StyledInput = styled.input`
  ${SharedInputCss}
`;
export const StyledTokenInput = styled.div`
  ${SharedInputCss}
  input {
    background: transparent;
    border-style: none;
  }

  .TokenInput-Cluster {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
  }
`;
