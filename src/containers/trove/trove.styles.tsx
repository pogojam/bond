import styled from "styled-components";

export const TroveStyles = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .circle-graph {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .circle-value {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .trove-wrapper {
    padding: 0px;
  }
  .trove-controls-wrapper {
    background-color: #030a12;
  }
`;
