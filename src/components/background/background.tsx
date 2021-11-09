import React from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

export const BackgroundTemplate = ({
  className,
  children,
}: {
  className?: string;
  children?: any;
}) => {
  const location = useLocation();
  return (
    <div className={className}>
      <div className={`wrapper ${location.pathname === "/" && "center"}`}>
        {children}
      </div>
    </div>
  );
};

export const Background = styled(BackgroundTemplate)`
  z-index: 0;
  position: relative;
  background-color: ${({ theme }) => theme.global.background};
  background-image: url("../static/Frame 1@2x.svg");
  width: 100%;
  height: 100%;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .wrapper {
    background-color: #100c27;
    height: 100%;
    display: grid;
    grid-template-columns: auto 85vw;
    grid-template-rows: auto 100%;
    overflow: hidden;
  }
  .center {
    grid-template-columns: auto;
    grid-template-rows: auto;
  }

  .gas {
    z-index: -1;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    width: 70%;
    height: 100%;
    min-width: 600px;
    background: radial-gradient(
      72.68% 207.07% at 50% 50%,
      #100c27 -2.02%,
      #000000 59%
    );
  }
`;
