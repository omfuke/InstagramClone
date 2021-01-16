import "./App.css";
import Auth from "./component/Auth/Auth";
import Register from "./component/Register/Register";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
};

export default App;
