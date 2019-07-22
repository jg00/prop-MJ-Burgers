import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

// import * as actionTypes from "../../store/actions";
import * as burgerBuilderActions from "../../store/actions/index";

// const INGREDIENT_PRICES = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7
// };

class BurgerBuilder extends Component {
  state = {
    // ingredients: null,  No longer using local state
    // totalPrice: 4, // base price of burger
    // purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    console.log("Burgerbuilder test", this.props);
    // Comment out for now
    // axios
    //   .get("https://mj-burgers.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     console.log("BurgerBilder_componentDidMount", response.data);
    //     this.setState({
    //       ingredients: response.data
    //     });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  // Now with Redux just redirect to /checkout but now ingredients is available through Redux store.
  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  /*
  // With Redux we don't need to pass data through queryParams any more.  Commented for refrence only.
  purchaseContinueHandler = () => {
    // Build query string of ingredients and values
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice); // For now pass totalPrice along with ingredients.
    const queryString = queryParams.join("&");

    // this.props.history.push("/checkout");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };
  */

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    // this.setState({purchasable: sum > 0}); // Order button state no longer used to update if purchasable that enables/disables the order button.
    return sum > 0; // returns true if greater
  };

  /*
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const priceAdditon = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdditon;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });

    this.updatePurchaseState(updatedIngredients);
  };
  */

  /*
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });

    this.updatePurchaseState(updatedIngredients);
  };
  */

  render() {
    // Identify buttons that should be disabled
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    // Ingredients retrieved from DB required.
    let burger = this.state.error ? (
      <p>Ingredients cannot be loaded!</p>
    ) : (
      <Spinner />
    );

    // Display only when ingredients set on ComponentDidMount()
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            // purchasable={this.state.purchasable}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    // Check to override overSummary when needed
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(burgerBuilderActions.removeIngredient(ingName))

    /*
      onIngredientAdded: ingName =>
        dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
      onIngredientRemoved: ingName =>
        dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    */
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

/*  
Important that in the HOC withErrorHandler we need to distribute the props of the component like below.  
*Key - In the end what connect(map constants) will do is it will just set some props on the component
it is wrapping.  So as long as you pass {...this.props} on in your own HOCs, this should work fine because
any props set by other HOCs which might wrap this one, will still be passed on just fine.

  <WrappedComponent {...this.props} />
*/
