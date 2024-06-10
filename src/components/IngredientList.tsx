import React, { useState } from "react";
import { Ingredient } from "../interfaces/Ingredient";

interface IngredientListProps {
  ingredients: Ingredient[];
  selectedIngredient: string;
  onSelectIngredient: (ingredient: string) => void;
}

const IngredientList: React.FC<IngredientListProps> = ({
  ingredients,
  selectedIngredient,
  onSelectIngredient,
}) => {
  const [showAll, setShowAll] = useState(false);

  const displayedIngredients = showAll ? ingredients : ingredients.slice(0, 5);

  return (
    <div>
      <h2>Ingredients</h2>
      <label>
        <input
          type="radio"
          value=""
          checked={selectedIngredient === ""}
          onChange={() => onSelectIngredient("")}
        />
        None
      </label>
      {displayedIngredients.map((ingredient) => (
        <div key={ingredient.strIngredient1}>
          <label>
            <input
              type="radio"
              value={ingredient.strIngredient1}
              checked={selectedIngredient === ingredient.strIngredient1}
              onChange={() => onSelectIngredient(ingredient.strIngredient1)}
            />
            {ingredient.strIngredient1}
          </label>
        </div>
      ))}
      {ingredients.length > 5 && (
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default IngredientList;
