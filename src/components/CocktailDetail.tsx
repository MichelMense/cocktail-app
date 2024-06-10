import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cocktail } from "../interfaces/Cocktail";
import "./CocktailDetail.css";
import SearchBar from "./SearchBar";

const CocktailDetail: React.FC = () => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);

  useEffect(() => {
    const fetchCocktail = async () => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      setCocktail(data.drinks[0]);
    };

    fetchCocktail();
  }, [id]);

  if (!cocktail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cocktail-detail">
      <SearchBar onSearch={() => {}} />
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <h2>{cocktail.strDrink}</h2>
      <h3>{cocktail.strAlcoholic}</h3>
      <h3>{cocktail.strCategory}</h3>
      <ul className="ingredients-list">
        {Array.from({ length: 15 }, (_, i) => i + 1)
          .map((i) => {
            const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail];
            const measure = cocktail[`strMeasure${i}` as keyof Cocktail];
            if (ingredient) {
              return (
                <li key={i}>
                  <img
                    src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`}
                    alt={ingredient}
                  />
                  <span>
                    {ingredient} - {measure}
                  </span>
                </li>
              );
            }
            return null;
          })
          .filter((item) => item !== null)}
      </ul>
      <h3>Zubereitung</h3>
      <p>{cocktail.strInstructions}</p>
    </div>
  );
};

export default CocktailDetail;
