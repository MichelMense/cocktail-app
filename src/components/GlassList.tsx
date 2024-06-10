import React, { useState } from "react";
import { Glass } from "../interfaces/Glass";

interface GlassListProps {
  glasses: Glass[];
  selectedGlass: string;
  onSelectGlass: (glass: string) => void;
}

const GlassList: React.FC<GlassListProps> = ({
  glasses,
  selectedGlass,
  onSelectGlass,
}) => {
  const [showAll, setShowAll] = useState(false);

  const displayedGlasses = showAll ? glasses : glasses.slice(0, 5);

  return (
    <div>
      <h2>Glasses</h2>
      <label>
        <input
          type="radio"
          value=""
          checked={selectedGlass === ""}
          onChange={() => onSelectGlass("")}
        />
        None
      </label>
      {displayedGlasses.map((glass) => (
        <div key={glass.strGlass}>
          <label>
            <input
              type="radio"
              value={glass.strGlass}
              checked={selectedGlass === glass.strGlass}
              onChange={() => onSelectGlass(glass.strGlass)}
            />
            {glass.strGlass}
          </label>
        </div>
      ))}
      {glasses.length > 5 && (
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default GlassList;
