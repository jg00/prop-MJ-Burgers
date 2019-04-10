import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  // Consume ingredients object. Create a final array of ingredient types (one array entry per ingredient quantity (ie even on same ingredient))
  let ingredientQtyListEach = [];
  for (let ig in props.ingredients) {
    for (let i = 0; i < props.ingredients[ig]; i++) {
      ingredientQtyListEach.push(ig);
    }
  }

  let transformedIngredients = ingredientQtyListEach.map((igKey, index) => {
    return <BurgerIngredient key={igKey + index} type={igKey} />;
  });

  // Default to handle empty array of ingredients
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;

/*
  // Reference alternative code
    let transformedIngredients = Object.keys(props.ingredients)
      .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
          return <BurgerIngredient key={igKey + i} type={igKey} />;
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);

    console.log(transformedIngredients);

    // Default to handle empty array of ingredients
    if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Please start adding ingredients!</p>;
    }
*/
