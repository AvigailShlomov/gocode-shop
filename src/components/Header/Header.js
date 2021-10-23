import "./header.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}`;
}

function Header({ categoriesList, onCategory }) {
  const [value, setValue] = React.useState([1, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log({ categoriesList });
  return (
    <nav className="product-filter">
      <h1>Abi's Shop</h1>

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
        <Box sx={{ width: 120, margin: 2 }}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            // min="1"
            // max="1000"
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Box>

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
