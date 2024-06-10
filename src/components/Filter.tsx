import React from "react";

interface FilterProps {
  onFilter: (ingredient: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [ingredient, setIngredient] = React.useState("");

  const handleFilter = () => {
    onFilter(ingredient);
  };

  return (
    <div>
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="Filter by ingredient..."
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default Filter;
