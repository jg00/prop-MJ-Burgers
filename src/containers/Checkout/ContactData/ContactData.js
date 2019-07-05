import React, { Component } from "react";

import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault(); // Default behavior inside the form is to post the data.  Added preventDefault() to prevent reloading.
    // console.log("ContactData.js_orderHandler", this.props);

    // For spinner
    this.setState({
      loading: true
    });

    // alert("You clicked continue!");
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
    };

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
  };

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
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    this.setState({ orderForm: updatedOrderForm });
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
      <form>
        {/* <Input elementType="..." elementConfig="..." value="..." /> */}

        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangedHander(event, formElement.id)}
          />
        ))}

        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
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

export default ContactData;

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
