import { useEffect, useState } from "react";
import Cart from "../components/Cart/Cart";
import Header from "../components/Header/Header";
import Products from "../components/Products/Products";
// import MyContext from "../MyContext";
import "../App.css";
// import StrDisplayBtn from "./components/StrDisplayBtn/StrDisplayBtn";
import React from "react";

function Home() {
  const [productsDetails, setProductsDetails] = useState([]);
  const [productsCategory, setProductsCategory] = useState([]);
  const [productsPrice, setProductsPrice] = useState([]);

  const url = "/api/products";

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((products) => {
        setProductsDetails(products);
        setProductsCategory(products);
        setProductsPrice(products);
      });
  }, []);

  const onFilterCategory = (categorySelected) => {
    if (categorySelected.length === 0) setProductsCategory(productsDetails);
    else {
      setProductsCategory(
        productsDetails.filter((x) => categorySelected.includes(x.category))
      );
    }
  };

  const onFilterPrice = (minPrice, maxPrice) => {
    setProductsCategory(
      productsPrice.filter((x) => x.price >= minPrice && x.price <= maxPrice)
    );
  };

  const categories = productsDetails
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);

  return (
    <div className="App">
      <Header
        categoriesList={categories}
        onCategory={onFilterCategory}
        onPrice={onFilterPrice}
      />
      <Cart />
      {/* <StrDisplayBtn /> */}
      <Products listOBJ={productsCategory} />
    </div>
  );
}
export default Home;
