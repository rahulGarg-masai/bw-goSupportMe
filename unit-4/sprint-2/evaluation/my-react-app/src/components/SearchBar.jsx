import { useState, useEffect, useRef } from "react";
import "../styles/SearchBar.css";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Auto-focus on page load
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search snacks..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
