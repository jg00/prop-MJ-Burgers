import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  // Update this component only when Order Now clicked
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentDidUpdate() {
    console.log("[Modal] componentDidUpdate");
  }

  render() {
    const showHide = this.props.show ? classes.Modal : classes.ModalHide;
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className={showHide}>{this.props.children}</div>
      </Aux>
    );
  }
}

export default Modal;

/* 
  Functional component version only before adding lifecycle checks.  Kept for reference only.
  
const modal = props => {
  const showHide = props.show ? classes.Modal : classes.ModalHide;
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div className={showHide}>{props.children}</div>
    </Aux>
  );
};

export default modal;
*/

/*  Inline sytling reference only
const modal = props => {
  return (
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      {props.children}
    </div>
  );
};

*/
