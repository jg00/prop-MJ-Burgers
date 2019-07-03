import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

/*
    Plan Presentation and Behavior of this component
    Summary preview of what the user is about to buy and price, show the burger itself.
    Button to cancel and return to the burger builder
    Button to continue to load the contact form

*/

class Checkout extends Component {
  // Dummy data for now but we will need routing to pass ingredients
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  };

  componentDidMount() {
    console.log("Checkout.js_componentDidMount()", this.props);
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      // ['salad', '1']
      ingredients[param[0]] = +param[1];
    }

    this.setState({
      ingredients: ingredients
    });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}

export default Checkout;
