import React from "react";
import DEMO from "./../../../../../store/constant";
import Aux from "../../../../../hoc/_Aux";
import Logo from "../../../../../assets/images/logo.png";

const navLogo = (props) => {
  return (
    <Aux>
      <div className="navbar-brand header-logo">
        <a href={DEMO.BLANK_LINK} className="b-brand">
          {/* <div className="b-bg">
            <i className="feather icon-trending-up" />
          </div> */}
          <img src={Logo} width="170" className="b-title" />
        </a>
      </div>
    </Aux>
  );
};

export default navLogo;
