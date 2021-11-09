import { Box } from "../box/box";
import { StyledInput, StyledTokenInput } from "./input.styles";

export const Input = StyledInput;

export const TokenInput = ({ label = "" }) => {
  return (
    <StyledTokenInput>
      <Box>
        <label>{label}</label>
        <Input />
        <div className="TokenInput-Cluster"></div>
      </Box>
    </StyledTokenInput>
  );
};
