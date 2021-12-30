import "./header.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(category, categoriesList, theme) {
  return {
    fontWeight:
      categoriesList.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function valuetext(value) {
  return `${value}`;
}

function Header({ categoriesList, onCategory, onPrice }) {
  const [value, setValue] = useState([1, 1000]);
  const [categorySelected, setCategorySelected] = useState([]);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onPrice(value[0], value[1]);
  };

  const handleChangeCategory = (event) => {
    const value = event.target.value;
    setCategorySelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    onCategory(value);
  };

  return (
    <nav className="product-filter">
      <h1>Abi's Shop</h1>

      <Box sx={{ width: 230, margin: 2 }}>
        <h6>Price Range</h6>
        <Slider
          getAriaLabel={() => "Price range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0}
          max={1000}
        />
        <h6>
          {value[0]}-{value[1]}
        </h6>
      </Box>

      {/* <div className="collection-sort"> */}
      <FormControl sx={{ m: 2, width: 250 }}>
        <InputLabel id="demo-multiple-name-label">Category</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={categorySelected}
          onChange={handleChangeCategory}
          input={<OutlinedInput label="Category" />}
          MenuProps={MenuProps}
        >
          {/* <option value="All">All</option> */}

          {categoriesList.map((category, index) => (
            <MenuItem
              key={index}
              value={category}
              style={getStyles(category, categoriesList, theme)}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* </div> */}

      {/* <div className="collection-sort"> */}
      {/* <label>Sort by:</label>
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
        </div> */}
    </nav>
  );
}

export default Header;
// onChange={() => onCategory(this.value)}
