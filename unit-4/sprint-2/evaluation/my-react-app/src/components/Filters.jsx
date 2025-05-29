import "../styles/Filters.css";

function Filters({ onFilterChange, onSortChange }) {
  return (
    <div className="filters">
      <div className="filter-group">
        <label>Filter by:</label>
        <select onChange={(e) => onFilterChange(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Sweet">Sweet</option>
          <option value="Savory">Savory</option>
          <option value="Beverage">Beverage</option>
          <option value="Baked">Baked</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label>Sort by:</label>
        <select onChange={(e) => onSortChange(e.target.value)}>
          <option value="">No sorting</option>
          <option value="titleAsc">Title (A-Z)</option>
          <option value="titleDesc">Title (Z-A)</option>
          <option value="priceAsc">Price (Low-High)</option>
          <option value="priceDesc">Price (High-Low)</option>
          <option value="ratingDesc">Rating (Highest)</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
