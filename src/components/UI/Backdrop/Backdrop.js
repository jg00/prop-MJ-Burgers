import React from "react";
import classes from "./Backdrop.module.css";

/*
  References:
    BurgerBuilder > Modal > BackDrop
    Layout > SideDrawer > BackDrop
*/

const backdrop = props =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked} />
  ) : null;

export default backdrop;
