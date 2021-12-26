import { useContext } from "react";
import MyContext from "../../MyContext";
// import Product from "../Product/Product";
import ProductCart from "../ProductCart";

function Cart() {
  const [productCart, setProductCart] = useContext(MyContext);
  return (
    <div>
      {productCart.map((item) => (
        <ProductCart
          key={item._id}
          id={item._id}
          title={item.title}
          price={item.price}
          image={item.image}
          category={item.category}
          amount={item.amount}
        />
      ))}
    </div>
  );
}

export default Cart;
