import React from "react";
import classes from "./Input.module.css";

const input = props => {
  let inputElement = null;

  // Handling multiple classes
  const inputClasses = [classes.InputElement];

  // Possible to add validation message
  // let validationError = null;

  /*
    props.invalid - check to see input is valid or not
    props.shouldValidate - not all elements need to be validated like select options. 
    props.touched - add this Invalid class only if the element has been touched.  This is so we do not start with all red input elements.
  */
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
    // validationError = <p>Please enter valid value</p>;
  }

  // Return an element
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          // className={classes.InputElement}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          // className={classes.InputElement}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          // className={classes.InputElement}
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    // Version for 'select'
    // console.log(props.elementConfig.options); [{},{}]
    // const optionsDisplay = props.elementConfig.options.map(option => (
    //   <option key={option.value} value={option.value}>
    //     {option.displayValue}
    //   </option>
    // ));

    default:
      inputElement = (
        <input
          // className={classes.InputElement}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {/* {validationError} */}
    </div>
  );
};

export default input;
