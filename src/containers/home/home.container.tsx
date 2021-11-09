import { Link } from "react-router-dom";
import { CircleButton } from "../../components/button/button";
import { HomeStyles } from "./home.styles";

export const HomeContainer = () => {
  return (
    <HomeStyles>
      <h1>bond</h1>
      <h2>Stable Money.</h2>
      <Link to="/App">
        <CircleButton>app</CircleButton>
      </Link>
    </HomeStyles>
  );
};
