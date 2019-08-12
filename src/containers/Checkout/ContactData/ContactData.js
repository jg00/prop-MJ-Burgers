import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest", // Should not be empty string b/c if never updated, the actual value will always be empty string eventhough it shows in the UI.
        validation: {}, // Added because accessing validation.required not available will cause error.  However by adding empty object {}, we get undefined for validation.required.  This works.
        valid: true
      }
    },
    formIsValid: false
    // loading: false  // Now handled through redux
  };

  orderHandler = event => {
    event.preventDefault(); // Default behavior inside the form is to post the data.  Added preventDefault() to prevent reloading.
    // console.log("ContactData.js_orderHandler", this.props);

    /* No handled through redux
    // For spinner
    this.setState({
      loading: true
    });
    */

    // { name:nameValue, street:streetVaue}
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    // alert("You clicked continue!");
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);

    /*
    // path requires .json for Firebase only
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({
          loading: false
        });
      });
      */
  };

  checkValidity(value, rules) {
    let isValid = true;

    // One way to handle dropdown that does not have validation rules defined.
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  /* 
    - Do not update original state directly like this.state.orderForm.value
    - Update immutably by making copy of the state (note watch out for deep clones )
  */
  inputChangedHander = (event, inputIdentifier) => {
    console.log(event.target.value);

    /* (Make a clone of {} and update properties within the cloned {})
       Important - this does not create a deep clone of nested objects but instead get a pointer 
       to those objects only.  Any changes directly then will still mutate the original state.
    */
    const updatedOrderForm = { ...this.state.orderForm }; // This distributes properties of the order form ie 'name', 'email', etc.  Also see important note above.

    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }; // Clone objects assocaiated to the properties like 'name', email', etc.
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true; // Behavior to check validity only if element was touched.  Behavior to no have all red textboxes to begin with.

    updatedOrderForm[inputIdentifier] = updatedFormElement;
    // console.log(updatedFormElement);

    // Check all input is valid to enable button
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      // console.log(inputIdentifiers)
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {/* <Input elementType="..." elementConfig="..." value="..." /> */}

        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid} // input element values need to be checked for valid data
            shouldValidate={formElement.config.validation} // not all elements need to be validated like select option
            touched={formElement.config.touched} // add this Invalid class only if the element has been touched.  This is so we do not start with all red input elements.
            changed={event => this.inputChangedHander(event, formElement.id)}
          />
        ))}

        {/* <Button btnType="Success" clicked={this.orderHandler}> Handle with form submit*/}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));

/* 
// Previous version reference only
  <Input
    inputtype="input"
    type="text"
    name="name"
    placeholder="Your Name"
  />

  ...
*/
