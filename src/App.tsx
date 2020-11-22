import React from "react";
import { Route, Switch } from "react-router-dom";
import { GlobalStateProvider } from "./GlobalStateProvider";

import PageOne from "./PageOne";
import PageTwo from "./PageTwo";

function App() {
  return (
    <Switch>
      <GlobalStateProvider>
        <Route exact path="/">
          <PageOne />
        </Route>

        <Route exact path="/two">
          <PageTwo />
        </Route>
      </GlobalStateProvider>
    </Switch>
  );
}

export default App;
