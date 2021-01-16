import "./App.css";
import Auth from "./component/Auth/Auth";

import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth} />
      </Switch>
    </Router>
  );
};

export default App;
