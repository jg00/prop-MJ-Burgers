import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  // Consume ingredients object.  Ingredient x Qty.
  const transformedIngredients = () => {
    let ingredientQtyListEach = [];
    for (let ig in props.ingredients) {
      for (let i = 0; i < props.ingredients[ig]; i++) {
        ingredientQtyListEach.push(ig);
      }
    }

    return ingredientQtyListEach.map((igKey, index) => {
      return <BurgerIngredient key={igKey + index} type={igKey} />;
    });
  };

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients()}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;

/*
  // Reference alternative code
  const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    });
  });
*/
