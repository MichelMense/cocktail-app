import React from "react";
import { useNavigate } from "react-router-dom";
import { Cocktail } from "../interfaces/Cocktail";
import "./CocktailCard.css";

interface CocktailCardProps {
  cocktail: Cocktail;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cocktail/${cocktail.idDrink}`);
  };

  return (
    <section id="cocktailcard" onClick={handleClick}>
      <div className="cocktail-container">
        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
        <div className="cocktail-text">
          <h3 className="drink">{cocktail.strDrink}</h3>
          <h3 className="alcoholic">{cocktail.strAlcoholic}</h3>
          <h3 className="category">{cocktail.strCategory}</h3>
        </div>
      </div>
    </section>
  );
};

export default CocktailCard;
