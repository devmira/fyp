import React from "react";

const SignUp = React.lazy(() => import("./Pages/Authentication/SignUp/SignUp"));
const Signin = React.lazy(() => import("./Pages/Authentication/SignIn/SignIn"));
const LandingPage = React.lazy(() => import("./Pages/landingPage"));
const InventingSystem = React.lazy(() => import("./Pages/inventing"));

const route = [
  { path: "/signup", exact: true, name: "Signup", component: SignUp },
  { path: "/signin", exact: true, name: "Signin", component: Signin },
  { path: "/home", exact: true, name: "Home", component: LandingPage },
  {
    path: "/inventing-system",
    exact: true,
    name: "InventingSystem",
    component: InventingSystem,
  },
];

export default route;
