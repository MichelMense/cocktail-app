import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import SearchIngredient from "./components/SearchIngredient";
import CocktailList from "./components/CocktailList";
import IngredientList from "./components/IngredientList";
import CocktailDetail from "./components/CocktailDetail";
import { Cocktail } from "./interfaces/Cocktail";
import { Ingredient } from "./interfaces/Ingredient";
import cocktailsData from "./data/cocktails.json";
import ingredientsData from "./data/ingredients.json";


import "./App.css";

const App: React.FC = () => {
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [filteredCocktails, setFilteredCocktails] = useState<Cocktail[]>([]);
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [ingredientTitleList, setIngredientTitleList] = useState<string[]>([]);

  useEffect(() => {
    getCocktails();
    getIngredients();
  }, []);

  useEffect(() => {
  }, [selectedIngredients]);
  const getCocktails = () =>
  {
    const cocktails: Cocktail[] = cocktailsData as Cocktail[];
    setCocktails(cocktails);
  }

  const searchIngredient = async(query: string) => {
    const ingredients: Ingredient[] = ingredientsList.filter(ingredient => {
      let title = ingredient.title.toLowerCase();
      query = query.toLowerCase();
      return title.startsWith(query);
    });
    setIngredientTitleList(ingredients.map(ingredient => ingredient.title));

  }

  const getIngredients = async () => {
    const ingredients: Ingredient[] = ingredientsData as Ingredient[];
    setIngredientsList(ingredients);
  };

  const filterCocktails = async (query: string) => {
    setFilteredCocktails(cocktails.filter(cocktail => {
      let title = cocktail.title.toLowerCase();
      query = query.toLowerCase();
      return title.startsWith(query);
    }));
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div id="app">
              <div id="filters">
                <SearchIngredient 
                  onSearch={searchIngredient}
                />
                <IngredientList
                  titles={ingredientTitleList}
                />
              </div>
              <div id="cocktails">
                <SearchBar onSearch={filterCocktails} />
                <CocktailList cocktails={filteredCocktails} />
              </div>
            </div>
          }
        />
        <Route path="/cocktail/:id" element={<CocktailDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
