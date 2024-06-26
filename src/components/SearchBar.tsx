import React from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState("");

  const handleSearch = (search: string) => {
    onSearch(search);
  };

  return (
    <section id="search">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="Search for cocktails..."
      />
      <button onClick={() => handleSearch(query)}>Search</button>
    </section>
  );
};

export default SearchBar;
