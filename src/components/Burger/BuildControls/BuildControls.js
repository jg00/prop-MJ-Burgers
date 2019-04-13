import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControlsList = props => {
  return controls.map(control => (
    <BuildControl
      key={control.label}
      label={control.label}
      added={() => props.ingredientAdded(control.type)}
      removed={() => props.ingredientRemoved(control.type)}
      disabled={props.disabled[control.type]}
    />
  ));
};

const buildControls = props => (
  <div className={classes.BuildControls}>{buildControlsList(props)}</div>
);

export default buildControls;
