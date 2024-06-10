import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import CocktailList from "./components/CocktailList";
import CategoryList from "./components/CategoryList";
import GlassList from "./components/GlassList";
import AlcoholicList from "./components/AlcoholicList";
import IngredientList from "./components/IngredientList";
import CocktailDetail from "./components/CocktailDetail";
import { Cocktail } from "./interfaces/Cocktail";
import { Category } from "./interfaces/Category";
import { Glass } from "./interfaces/Glass";
import { Ingredient } from "./interfaces/Ingredient";
import { Alcoholic } from "./interfaces/Alcoholic";
import "./App.css";

const App: React.FC = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [glasses, setGlasses] = useState<Glass[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [alcoholics, setAlcoholics] = useState<Alcoholic[]>([]);
  const [filteredCocktails, setFilteredCocktails] = useState<Cocktail[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedGlass, setSelectedGlass] = useState<string>("");
  const [selectedAlcoholic, setSelectedAlcoholic] = useState<string>("");
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");

  useEffect(() => {
    fetchCategories();
    fetchGlasses();
    fetchIngredients();
    fetchAlcoholics();
  }, []);

  useEffect(() => {
    filterCocktailsBySelection();
  }, [selectedCategory, selectedGlass, selectedAlcoholic, selectedIngredient]);

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
    if (selectedCategory) {
      filtered = filtered.filter(
        (cocktail) => cocktail.strCategory === selectedCategory
      );
    }
    if (selectedGlass) {
      filtered = filtered.filter(
        (cocktail) => cocktail.strGlass === selectedGlass
      );
    }
    if (selectedAlcoholic) {
      filtered = filtered.filter(
        (cocktail) => cocktail.strAlcoholic === selectedAlcoholic
      );
    }
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

  const fetchCategories = async () => {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
    );
    const data = await response.json();
    setCategories(data.drinks);
  };

  const fetchGlasses = async () => {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`
    );
    const data = await response.json();
    setGlasses(data.drinks);
  };

  const fetchIngredients = async () => {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`
    );
    const data = await response.json();
    setIngredients(data.drinks);
  };

  const fetchAlcoholics = async () => {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list`
    );
    const data = await response.json();
    setAlcoholics(data.drinks);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div id="app">
              <div id="filters">
                <CategoryList
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
                <GlassList
                  glasses={glasses}
                  selectedGlass={selectedGlass}
                  onSelectGlass={setSelectedGlass}
                />
                <AlcoholicList
                  alcoholics={alcoholics}
                  selectedAlcoholic={selectedAlcoholic}
                  onSelectAlcoholic={setSelectedAlcoholic}
                />
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
