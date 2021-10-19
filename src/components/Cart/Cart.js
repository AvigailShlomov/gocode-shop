import { useContext } from "react";
import MyContext from "../../MyContext";
import Product from "../Product/Product";
// import Product from "../Product/Product";
import ProductCart from "../ProductCart";

function Cart(params) {
  const [productCart, setProductCart] = useContext(MyContext);
  return (
    // <div>
    //   {productCart.map((item) => (
    //     <ProductCart
    //       key={item.id}
    //       id={item.id}
    //       title={item.title}
    //       price={item.price}
    //       image={item.image}
    //       category={item.category}
    //       amount={item.amount}
    //     />
    //   ))}
    // </div>
    <section className="products">
      {productCart.map((item) => (
        <Product
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          image={item.image}
          category={item.category}
        />
      ))}
    </section>
  );
}

export default Cart;
