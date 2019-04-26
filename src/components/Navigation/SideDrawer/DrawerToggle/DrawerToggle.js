import React from "react";
import classes from "./DrawerToggle.module.css";

const drawerToggle = props => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div className={classes.line_1} />
    <div />
    <div className={classes.line_3} />
  </div>
);

export default drawerToggle;
