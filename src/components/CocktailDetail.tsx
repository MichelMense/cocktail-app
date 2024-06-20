import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cocktail } from "../interfaces/Cocktail";
import cocktailsData from "../data/cocktails.json";
import "./CocktailDetail.css";
import SearchBar from "./SearchBar";

const CocktailDetail: React.FC = () => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);

  useEffect(() => {
    let cocktail = cocktailsData.filter(cocktail => cocktail.id === id);
    setCocktail(cocktail[0]);
  }, [id]);

  if (!cocktail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cocktail-detail">
      <SearchBar onSearch={() => {}} />
      <img src={cocktail.drinkThumb} alt={cocktail.title} />
      <h2>{cocktail.title}</h2>
      <h3>{cocktail.alcoholic}</h3>
      <h3>{cocktail.category}</h3>
      <ul className="ingredients-list">
        {Array.from({ length: 15 }, (_, i) => i + 1)
          .map((i) => {
            let ingredient = cocktail[`ingredient${i}` as keyof Cocktail];
            let measure = cocktail[`measure${i}` as keyof Cocktail];
            if (ingredient === "null")
            {
              ingredient = undefined;
            }
            if (measure === "null")
            {
              measure = undefined;
            }
            if (ingredient)
            {
              if (ingredient) {
                return (
                  <li key={i}>
                    <img
                      src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`}
                      alt={ingredient}
                    />
                    <span>
                      {ingredient} {measure ? `- ${measure}`: ""}
                    </span>
                  </li>
                );
              }
            }
            return null;
          })
          .filter((item) => item !== null)}
      </ul>
      <h3>Zubereitung</h3>
      <p>{cocktail.instructionsDE}</p>
    </div>
  );
};

export default CocktailDetail;
