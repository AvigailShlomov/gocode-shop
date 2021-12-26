// import { useContext } from "react";
// import MyContext from "../../MyContext";
// import "./Product.css";

function ProductCart({ key, id, image, title, price, category, amount }) {
  //   const [productCart, setProductCart] = useContext(MyContext);

  return (
    <div className="productCart-card">
      <div className="productCart-img">
        <img width="100px" height="135px" src={image} alt="sweater img" />
      </div>
      <div className="product-info">
        <h5>{title}</h5>
        <h6>{category}</h6>
        <h6>{price}$</h6>
        <h5>{amount}</h5>
      </div>
    </div>
  );
}

export default ProductCart;
