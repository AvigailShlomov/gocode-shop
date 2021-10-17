import "./header.css";
//let val = "";
function Header({ categoriesList, onCategory }) {
  console.log({ categoriesList });
  return (
    <nav className="product-filter">
      <h1>Jackets</h1>

      <div className="sort">
        <div className="collection-sort">
          <label>Filter by:</label>
          <select onChange={(e) => onCategory(e.target.value)}>
            <option value="select category">Select your category</option>
            {categoriesList.map((value1, index) => (
              <option value={value1} key={index}>
                {value1}
              </option>
            ))}
          </select>
        </div>

        <div className="collection-sort">
          <label>Sort by:</label>
          <select>
            <option value="/">Featured</option>
            <option value="/">Best Selling</option>
            <option value="/">Alphabetically, A-Z</option>
            <option value="/">Alphabetically, Z-A</option>
            <option value="/">Price, low to high</option>
            <option value="/">Price, high to low</option>
            <option value="/">Date, new to old</option>
            <option value="/">Date, old to new</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Header;
// onChange={() => onCategory(this.value)}
