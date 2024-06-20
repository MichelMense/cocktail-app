import React from "react";

interface IngredientListProps {
  titles: string[];
}

const IngredientList: React.FC<IngredientListProps> = ({
  titles
}) => {

  return (
    <div>
      {titles.map((title) => (
        <div key={title}>
          <label>
            {title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default IngredientList;
