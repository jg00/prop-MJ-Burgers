import React from "react";

import classes from "./Order.module.css";

const order = props => {
  // {bacon: 1, cheese: 1, meat: 1, salad: 1}
  // [ {name:amount},{},{} ]
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    // console.log(ingredientName);
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  // console.log(ingredients);

  const ingredientOutput = ingredients.map(ig => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;

/* Another version
  console.log(props.ingredients);
  // {bacon: 1, cheese: 1, meat: 1, salad: 1}
  console.log(Object.entries(props.ingredients));
  
  // Object.entries(obj) => [ [id,value], [id,value] ]
  let a = Object.entries(props.ingredients).map(ingArr => (
    <li key={ingArr[0]}>
      {ingArr[0]}: {ingArr[1]}
    </li>
  ));
  console.log(a);
*/
