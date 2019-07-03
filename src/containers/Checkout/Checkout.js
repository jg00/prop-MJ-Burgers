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

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}

export default Checkout;
