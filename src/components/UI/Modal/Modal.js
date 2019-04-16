import React from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";

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
