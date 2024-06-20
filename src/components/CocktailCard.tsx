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
    navigate(`/cocktail/${cocktail.id}`);
  };

  return (
    <section id="cocktailcard" onClick={handleClick}>
      <div className="cocktail-container">
        <img src={cocktail.drinkThumb} alt={cocktail.title} />
        <div className="cocktail-text">
          <h3 className="drink">{cocktail.title}</h3>
          <h3 className="alcoholic">{cocktail.alcoholic}</h3>
          <h3 className="category">{cocktail.category}</h3>
        </div>
      </div>
    </section>
  );
};

export default CocktailCard;
