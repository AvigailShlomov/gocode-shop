//import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import MyContext from "./MyContext";
// import StrDisplayBtn from "./components/StrDisplayBtn/StrDisplayBtn";

function App() {
  const [productsDetails, setProductsDetails] = useState([]);
  const [tempProductsDetails, setTempProductsDetails] = useState([]);
  const [productCart, setProductCart] = useState([]); //global

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

  const onFilter = (categorySelected) => {
    setTempProductsDetails(
      productsDetails.filter((x) => x.category === categorySelected)
    );
  };

  const categories = productsDetails
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);

  return (
    <MyContext.Provider value={[productCart, setProductCart]}>
      <div className="App">
        <Header categoriesList={categories} onCategory={onFilter} />
        <Cart />
        {/* <StrDisplayBtn /> */}
        <Products listOBJ={tempProductsDetails} />
      </div>
    </MyContext.Provider>
  );
}

export default App;
