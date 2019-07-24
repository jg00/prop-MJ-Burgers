import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  // ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      }; // Has to be an object in order for updateObject() to function correctly
      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
      );
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };

      return updateObject(state, updatedState);

    /*
        [action.ingredientName] > This is ES6 syntax that lets you dynamically overwrite a property in a given JS object {}
        You provide a reference to the property inside of [] that you want to update
        [] here this does 'not' create an array.  This is just the syntax that allows you to reference a property name that you want to update.
      */
    /* Original version before using updateObject() in utility.js
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
      */

    case actionTypes.REMOVE_INGREDIENT:
      // Kept original version and not using updateObject()
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };

    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
      });

    /* Original version
      return {
          ...state,
          // ingredients: action.ingredients, // displays in the order returned.
          ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
          },
          totalPrice: 4,
          error: false
        };
      */

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });

    /* Original version
      return {
        ...state,
        error: true
      };
    */

    default:
      return state;
  }
};

export default reducer;

/* Alternative to condence the switch statement in the reducer
  const addIngredient = (state, action) => {
    const updatedIngredient = {
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    }; // Has to be an object in order for updateObject() to function correctly
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
      ingredients: updatedIngredients,
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };

    return updateObject(state, updatedState);
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.ADD_INGREDIENT:
        return addIngredient(state, action);
      case actionTypes.REMOVE_INGREDIENT:
        return removeIngredient(state, action);
    }
  };
*/
