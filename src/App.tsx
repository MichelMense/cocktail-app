import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { readFile, writeFile } from "fs/promises";
import * as path from "path";
import SearchBar from "./components/SearchBar";
import CocktailList from "./components/CocktailList";
import IngredientList from "./components/IngredientList";
import CocktailDetail from "./components/CocktailDetail";
import { Cocktail } from "./interfaces/Cocktail";
import { Ingredient } from "./interfaces/Ingredient";

import "./App.css";

const App: React.FC = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [filteredCocktails, setFilteredCocktails] = useState<Cocktail[]>([]);

  const [selectedIngredient, setSelectedIngredient] = useState<string>("");

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    filterCocktailsBySelection();
  }, [selectedIngredient]);

  const fetchCocktails = async (query: string) => {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();
    setCocktails(data.drinks);
    filterCocktailsBySelection(data.drinks);
  };

  const filterCocktailsBySelection = (cocktailsToFilter = cocktails) => {
    let filtered = cocktailsToFilter;
    if (selectedIngredient) {
      filtered = filtered.filter((cocktail) =>
        Object.values(cocktail).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(selectedIngredient.toLowerCase())
        )
      );
    }
    setFilteredCocktails(filtered);
  };

  const fetchIngredients = async () => {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`
    );
    const data = await response.json();
    const drinks = data.drinks;
    const ingredients: Ingredient[] = [];
    for (const drink of drinks) {
      const response2 = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${drink.strIngredient1.replace(
          " ",
          "_"
        )}`
      );
      ingredients.push(await response2.json());
      console.log(__dirname);
      const outputPath = path.join(__dirname, "ingredients.txt");
      try {
        await writeFile(outputPath, await response2.json());
      } catch (err) {
        console.error(err);
      }
    }
    ingredients.sort((ing1, ing2) =>
      ing1.strIngredient > ing2.strIngredient
        ? 1
        : ing2.strIngredient > ing1.strIngredient
        ? -1
        : 0
    );
    console.log(ingredients);
    setIngredients(ingredients);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div id="app">
              <div id="filters">
                <IngredientList
                  ingredients={ingredients}
                  selectedIngredient={selectedIngredient}
                  onSelectIngredient={setSelectedIngredient}
                />
              </div>
              <div id="cocktails">
                <SearchBar onSearch={fetchCocktails} />
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
