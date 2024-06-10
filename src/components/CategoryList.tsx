import React, { useState } from "react";
import { Category } from "../interfaces/Category";

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const [showAll, setShowAll] = useState(false);

  const displayedCategories = showAll ? categories : categories.slice(0, 5);

  return (
    <div>
      <h2>Categories</h2>
      <label>
        <input
          type="radio"
          value=""
          checked={selectedCategory === ""}
          onChange={() => onSelectCategory("")}
        />
        None
      </label>
      {displayedCategories.map((category) => (
        <div key={category.strCategory}>
          <label>
            <input
              type="radio"
              value={category.strCategory}
              checked={selectedCategory === category.strCategory}
              onChange={() => onSelectCategory(category.strCategory)}
            />
            {category.strCategory}
          </label>
        </div>
      ))}
      {categories.length > 5 && (
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default CategoryList;
