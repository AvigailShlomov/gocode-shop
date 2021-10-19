import { useContext } from "react";
import MyContext from "../../MyContext";
import "./Product.css";

function Product({ key, id, image, title, price, category }) {
  const [productCart, setProductCart] = useContext(MyContext);

  let newProduct = "";

  function addProductToCart() {
    //   amount = productCart.filter(function (e) {
    //     return e.id === { id };
    //   }).length++;

    newProduct = { key, id, image, title, price, category };
    setProductCart([...productCart, newProduct]);
  }

  // if (amount === 1) {
  //   {
  //     newProduct = { key, id, image, title, price, category, amount };
  //     setProductCart([...productCart, newProduct]);
  //   }
  // } else {
  //   setProductCart(
  //     productCart.map((product) =>
  //       product.id === id ? { ...product, amount } : product
  //     )
  //   );

  // const deleteProductFromCart=()=>()

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt="sweater img" />
      </div>
      <div className="product-info">
        <h5>{title}</h5>
        <h6>{category}</h6>
        <h6>{price}$</h6>

        <button onClick={() => addProductToCart()}>+</button>
        {/* <h2>{amount}</h2> */}
        <button
        // onClick={() =>
        //   // deleteProductFromCart({ key, id, image, title, price, category })
        // }
        >
          {" "}
          -{" "}
        </button>
      </div>
    </div>
  );
}

export default Product;
