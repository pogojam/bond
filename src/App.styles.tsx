import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');
#root{
}
    html,body,#root{
      width:100%;
      height:100%;
      color:white;
    }      

    h1{
      color: white;
      font-family: 'Comfortaa', cursive;
      font-size: 7em;
      margin:0;
    }
    h2{
      font-family: 'Anton', sans-serif;
      color:#cdcdcdf0;
      letter-spacing: 7px;
    }


a{
  color: inherit;
  text-decoration: none;
}
`;
