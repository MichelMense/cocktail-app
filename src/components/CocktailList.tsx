import React from "react";
import { Cocktail } from "../interfaces/Cocktail";
import CocktailCard from "./CocktailCard";
import "./CocktailList.css";

interface CocktailListProps {
  cocktails: Cocktail[];
}

const CocktailList: React.FC<CocktailListProps> = ({ cocktails }) => {
  return (
    <section id="cocktaillist">
      {cocktails.map((cocktail) => (
        <CocktailCard key={cocktail.id} cocktail={cocktail} />
      ))}
    </section>
  );
};

export default CocktailList;
