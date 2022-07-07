import React from "react";

const SignUp = React.lazy(() => import("./Pages/Authentication/SignUp/SignUp"));
const Signin = React.lazy(() => import("./Pages/Authentication/SignIn/SignIn"));
const LandingPage = React.lazy(() => import("./Pages/landingPage"));

const route = [
  { path: "/signup", exact: true, name: "Signup", component: SignUp },
  { path: "/signin", exact: true, name: "Signin", component: Signin },
  { path: "/home", exact: true, name: "Home", component: LandingPage },
];

export default route;
