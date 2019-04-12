import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControlsList = controls.map(control => (
  <BuildControl key={control.label} label={control.label} />
));

const buildControls = props => (
  <div className={classes.BuildControls}>{buildControlsList}</div>
);

export default buildControls;
