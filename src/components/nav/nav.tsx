import { BiWater } from "react-icons/bi";
import { FiHome } from "react-icons/fi";
import { RiPlantLine, RiSafe2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { NavButton } from "../button/button";
import { NavStyles } from "./nav.styles";

export const Nav = () => {
  return (
    <NavStyles>
      <img src="https://defillama.com/static/media/logo_white_long.6fa86e26.svg" />
      <div className="Button-Container">
        <Link to="/App/Home">
          <NavButton icon={<FiHome />} label="Home" />
        </Link>
        <Link to="/App/Trove">
          <NavButton icon={<RiSafe2Line />} label="Trove" />
        </Link>
        <Link to="/App/Farms">
          <NavButton icon={<RiPlantLine />} label="Farms" />
        </Link>
        <Link to="/App/Liquidation">
          <NavButton icon={<BiWater />} label="Liquidation" />
        </Link>
      </div>
    </NavStyles>
  );
};
