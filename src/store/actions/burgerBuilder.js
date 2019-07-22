import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

// 'ingredients' data from firebase
export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("https://mj-burgers.firebaseio.com/ingredients.json")
      .then(response => {
        console.log("BurgerBilder_componentDidMount", response.data);
        dispatch(setIngredients(response.data));

        // No longer needed
        // this.setState({
        //   ingredients: response.data
        // });
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());

        // No longer needed
        // this.setState({ error: true });
      });
  };
};
