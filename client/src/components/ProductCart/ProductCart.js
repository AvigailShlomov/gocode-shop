import {
  getProductAmount,
  deleteProductFromCart,
  addProductToCart,
} from "../../utils/productFunctionalityUtils";
import { Button } from "@mui/material";
import { useContext } from "react";
import MyContext from "../../MyContext";
import "./productCart.css";

function ProductCart({ key, id, image, title, price, category, amount }) {
  const [productCart, setProductCart] = useContext(MyContext);
  return (
    <div className="productCart-card">
      <div className="productCart-img">
        <img width="100px" height="135px" src={image} alt="sweater img" />
      </div>
      <div className="product-info">
        <h5>{title}</h5>
        <h6>{price}$</h6>
      </div>

      <div className="center">
        <Button
          color="success"
          onClick={() => {
            addProductToCart(
              productCart,
              setProductCart,
              id,
              image,
              title,
              price,
              category
            );
          }}
        >
          {" "}
          +{" "}
        </Button>
        <span>{getProductAmount(productCart, id)}</span>
        <Button
          // color="primary"
          onClick={() => deleteProductFromCart(productCart, setProductCart, id)}
        >
          {" "}
          -{" "}
        </Button>
      </div>
      {/* </ButtonGroup> */}
    </div>
  );
}

export default ProductCart;
