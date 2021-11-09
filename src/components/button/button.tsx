import styled from "styled-components";
import {
  StyledCircleButton,
  StyledDashButton,
  StyledNavButton,
} from "./button.styles";

const Circle = styled((props) => (
  <svg {...props} height="60px" width="60px">
    <circle
      cx="50%"
      cy="50%"
      r="20"
      strokeWidth="3"
      stroke="#ff0000"
      fill="transparent"
    />
  </svg>
))`
  top: 0;
  left: 0;
  position: absolute;
`;

export const NavButton = (props: any) => {
  return (
    <StyledNavButton {...props}>
      {props.icon}
      {props.label}
    </StyledNavButton>
  );
};

export const CircleButton = (props: any) => {
  return (
    <StyledCircleButton {...props}>
      <span>app</span>
      <Circle></Circle>
    </StyledCircleButton>
  );
};

export const DashButton = (props: any) => {
  return <StyledDashButton {...props}>{props.children}</StyledDashButton>;
};
