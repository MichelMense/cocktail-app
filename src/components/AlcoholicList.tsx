import React, { useState } from "react";
import { Alcoholic } from "../interfaces/Alcoholic";

interface AlcoholicListProps {
  alcoholics: Alcoholic[];
  selectedAlcoholic: string;
  onSelectAlcoholic: (alcoholic: string) => void;
}

const AlcoholicList: React.FC<AlcoholicListProps> = ({
  alcoholics,
  selectedAlcoholic,
  onSelectAlcoholic,
}) => {
  const [showAll, setShowAll] = useState(false);

  const displayedAlcoholics = showAll ? alcoholics : alcoholics.slice(0, 5);

  return (
    <div>
      <h2>Alcoholic Types</h2>
      <label>
        <input
          type="radio"
          value=""
          checked={selectedAlcoholic === ""}
          onChange={() => onSelectAlcoholic("")}
        />
        None
      </label>
      {displayedAlcoholics.map((alcoholic) => (
        <div key={alcoholic.strAlcoholic}>
          <label>
            <input
              type="radio"
              value={alcoholic.strAlcoholic}
              checked={selectedAlcoholic === alcoholic.strAlcoholic}
              onChange={() => onSelectAlcoholic(alcoholic.strAlcoholic)}
            />
            {alcoholic.strAlcoholic}
          </label>
        </div>
      ))}
      {alcoholics.length > 5 && (
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default AlcoholicList;
