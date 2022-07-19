import React, { Component } from "react";

class OutsideClick extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * close menu if clicked on outside of element
   */
  handleOutsideClick(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.props.windowWidth < 992 && this.props.collapseMenu) {
        this.props.onToggleNavigation();
      }
    }
  }

  render() {
    return (
      <div className="nav-outside" ref={this.setWrapperRef}>
        {this.props.children}
      </div>
    );
  }
}

export default OutsideClick;
