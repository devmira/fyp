import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import useAuth from "../hooks/auth";

import "../../node_modules/font-awesome/scss/font-awesome.scss";

import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import routes from "../route";
import SignIn from "../Pages/Authentication/SignIn/SignIn";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import LandingPage from "../Pages/landingPage.js";
import InventingSystem from "../Pages/inventing.js";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});

const App = () => {
  const { authed } = useAuth();
  const privateRoute = () => {
    routes.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={(props) => <route.component {...props} />}
        />
      ) : null;
    });
  };

  return (
    <Aux>
      <ScrollToTop>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/home" component={LandingPage} />
            <Route path="/inventing-system" component={InventingSystem} />
            {authed && <Route path="/" component={AdminLayout} />}
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            {authed ? privateRoute() : <Redirect to="/signin" />}
          </Switch>
        </Suspense>
      </ScrollToTop>
    </Aux>
  );
};

export default App;
