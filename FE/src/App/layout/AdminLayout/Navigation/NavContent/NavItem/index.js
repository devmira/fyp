import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Aux from "../../../../../../hoc/_Aux";
import NavIcon from "./../NavIcon";
import NavBadge from "./../NavBadge";

class NavItem extends Component {
  render() {
    let itemTitle = this.props.item.title;
    if (this.props.item.icon) {
      itemTitle = <span className="pcoded-mtext">{this.props.item.title}</span>;
    }

    let itemTarget = "";
    if (this.props.item.target) {
      itemTarget = "_blank";
    }

    let subContent;
    if (this.props.item.external) {
      subContent = (
        <a href={this.props.item.url} target="_blank" rel="noopener noreferrer">
          <NavIcon items={this.props.item} />
          {itemTitle}
          <NavBadge layout={this.props.layout} items={this.props.item} />
        </a>
      );
    } else {
      subContent = (
        <NavLink
          to={this.props.item.url}
          className="nav-link"
          exact={true}
          target={itemTarget}
        >
          <NavIcon items={this.props.item} />
          {itemTitle}
          <NavBadge layout={this.props.layout} items={this.props.item} />
        </NavLink>
      );
    }
    let mainContent = "";
    if (this.props.layout === "horizontal") {
      mainContent = <li onClick={this.props.onItemLeave}>{subContent}</li>;
    } else {
      if (this.props.windowWidth < 992) {
        mainContent = (
          <li
            className={this.props.item.classes}
            onClick={this.props.onItemClick}
          >
            {subContent}
          </li>
        );
      } else {
        mainContent = <li className={this.props.item.classes}>{subContent}</li>;
      }
    }

    return <Aux>{mainContent}</Aux>;
  }
}

export default withRouter(NavItem);
