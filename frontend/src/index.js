import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
import createPalette from "material-ui/styles/palette";
import Home from "./routes/Home";
import Checkout from "./routes/Checkout";
import Page404 from "./components/Page404";

import "./styles/main.css";

const theme = createMuiTheme({
  palette: createPalette({
    type: "light"
  }),
  overrides: {
    Header: {
      root: {}
    },
    MuiButtonBase: {
      label: {
        textDecoration: "none"
      }
    }
  }
});

injectTapEventPlugin();
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router basename="/">
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/checkout"} component={Checkout} />
          <Route path="*" component={Page404} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
