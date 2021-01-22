import "./App.css";
import React, { useEffect } from "react";
import Auth from "./component/Auth/Auth";
import Register from "./component/Register/Register";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./component/Dashboard/Dashboard";
import CreateProfile from "./layout/CreateProfile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/create-profile" component={CreateProfile} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
