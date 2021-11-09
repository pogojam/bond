import "normalize.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { GlobalStyles } from "./App.styles";
import { Background } from "./components/background/background";
import { Bar } from "./components/bar/bar";
import { Nav } from "./components/nav/nav";
import { HomeContainer } from "./containers/home/home.container";
import { TroveContainer } from "./containers/trove/trove.container";
import { WalletContext } from "./context/wallet.context";
import { ModelContext } from "./models/model";
import { Theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <WalletContext>
        <ModelContext>
          <GlobalStyles />
          <Router>
            <Background>
              <Route path="/App" component={Bar} />
              <Route path="/App" component={Nav} />
              <Switch>
                <Route exact path="/" component={HomeContainer} />
                <Route exact path="/App/Home" component={TroveContainer} />
                <Route exact path="/App/Trove" component={TroveContainer} />
              </Switch>
            </Background>
          </Router>
        </ModelContext>
      </WalletContext>
    </ThemeProvider>
  );
}

export default App;
