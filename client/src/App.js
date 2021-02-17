import "./index.css";
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
import EditProfile from "./layout/EditProfile";
import Profile from "./layout/Profile";
import AllProfiles from "./layout/AllProfiles";
import "bootstrap/dist/css/bootstrap.min.css";
import OtherProfile from "./OtherUsers/OtherProfile";
import PostDetail from "./component/Post/PostDetail";

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
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/edit-profile" component={EditProfile} />
          <Route exact path="/all-profiles" component={AllProfiles} />
          <Route exact path="/profile/:name" component={OtherProfile} />
        </Switch>
        {/* <Route exact path="/post/:postId" component={PostDetail} /> */}
      </Router>
    </Provider>
  );
};

export default App;
