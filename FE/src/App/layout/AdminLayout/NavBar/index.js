import React, { Component } from "react";
import { connect } from "react-redux";
import NavRight from "./NavRight";
import Aux from "../../../../hoc/_Aux";
import DEMO from "../../../../store/constant";
import * as actionTypes from "../../../../store/actions";
import Logo from "../../../../assets/images/logo.png";

class NavBar extends Component {
  render() {
    let headerClass = [
      "navbar",
      "pcoded-header",
      "navbar-expand-lg",
      this.props.headerBackColor,
    ];
    if (this.props.headerFixedLayout) {
      headerClass = [...headerClass, "headerpos-fixed"];
    }

    return (
      <Aux>
        <header
          className={`${headerClass.join(" ")} ${
            window.location.pathname === "/home" ? "navBar-dark" : ""
          }`}
        >
          {window.location.pathname === "/home" && (
            <img src={Logo} width="200" style={{ paddingLeft: "40px" }} />
          )}
          <div className="m-header">
            <a href={DEMO.BLANK_LINK} className="b-brand">
              <div className="b-bg">
                <i className="feather icon-trending-up" />
              </div>
              <span className="b-title">Coupon System</span>
            </a>
          </div>
          <div className="collapse navbar-collapse">
            <NavRight rtlLayout={this.props.rtlLayout} />
          </div>
        </header>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rtlLayout: state.rtlLayout,
    headerBackColor: state.headerBackColor,
    headerFixedLayout: state.headerFixedLayout,
    collapseMenu: state.collapseMenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleNavigation: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
