import { useContext /*, useState*/ } from "react";
import MyContext from "../../MyContext";
// import ProductCart from "../ProductCart";
import "./Product.css";

function Product({ key, id, title, price, category, image }) {
  const [productCart, setProductCart] = useContext(MyContext);
  // const [quantity, setQuantity] = useState(0);

  let newProduct = "";
  function addProductToCart() {
    let amount = 1;
    const found = productCart.some((el) => el.id === id);
    if (found) {
      setProductCart(
        productCart.map((product) =>
          product.id === id
            ? { ...product, amount: product.amount + 1 }
            : product
        )
      );
    } else {
      newProduct = { key, id, image, title, price, category, amount };
      setProductCart([...productCart, newProduct]);
    }

    return;
  }

  function deleteProductFromCart() {
    productCart.forEach((product) => {
      if (product.id === id) {
        if (product.amount === 1) {
          setProductCart(productCart.filter((x) => x.id !== id));
        } else {
          setProductCart([
            ...productCart,
            {
              ...product,
              amount: product.amount - 1,
            },
          ]);
        }
      }
    });
    return;
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt="sweater img" />
      </div>
      <div className="product-info">
        <h5>{title}</h5>
        <h6>{category}</h6>
        <h6>{price}$</h6>

        <button
          onClick={() => {
            addProductToCart();
          }}
        >
          +
        </button>

        <button onClick={() => deleteProductFromCart()}> - </button>
      </div>
    </div>
  );
}

export default Product;
