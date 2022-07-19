import React from "react";
import Aux from "../../../../../hoc/_Aux";
import Logo from "../../../../../assets/images/logo.png";

const navLogo = (props) => {
  return (
    <Aux>
      <div className="navbar-brand header-logo">
        <a href="#!" className="b-brand">
          <img src={Logo} alt="Logo" width="170" className="b-title" />
        </a>
      </div>
    </Aux>
  );
};

export default navLogo;
