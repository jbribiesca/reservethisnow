import React from "react";
import Auth from './utils/Auth';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Clients from "./pages/Clients";
import Thankyou from "./pages/Clients/Thankyou";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import SignUp from "./pages/SignUp";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

const App = () =>
  <Router>
    <div>
      <Nav />
      <Switch>
        <PrivateRoute exact path="/" component={Appointments} />
        <PrivateRoute path="/home" component={Appointments} />
        <PrivateRoute exact path="/appointments" component={Appointments} />
        <PrivateRoute exact path="/appointments/:id" component={Detail} />
        <PrivateRoute exact path="/protected" component={Appointments} />
        <Route exact path="/clients" component={Clients}/>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/thankyou" component={Thankyou} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
