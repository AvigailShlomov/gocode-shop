//import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
// import StrDisplayBtn from "./components/StrDisplayBtn/StrDisplayBtn";

function App() {
  const [productsDetails, setProductsDetails] = useState([]);

  const url = "https://fakestoreapi.com/products";
  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((products) => {
        setProductsDetails(products);
        setTempProductsDetails(products);
      });
  }, []);

  const [tempProductsDetails, setTempProductsDetails] = useState([]);

  const onFilter = (categorySelected) => {
    setTempProductsDetails(
      productsDetails.filter((x) => x.category === categorySelected)
    );
  };

  const categories = productsDetails
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);

  return (
    <div className="App">
      <Header categoriesList={categories} onCategory={onFilter} />
      {/* <StrDisplayBtn /> */}
      <Products listOBJ={tempProductsDetails} />
    </div>
  );
}

export default App;
