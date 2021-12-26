import Product from "../Product/Product";
import "./Products.css";
import * as React from "react";

function Products({ listOBJ }) {
  console.log(listOBJ);
  return (
    <section className="products">
      {listOBJ.map((item) => (
        <Product
          key={item._id}
          id={item._id}
          title={item.title}
          price={item.price}
          image={item.image}
          category={item.category}
          // amount={item.amount}
        />
      ))}
    </section>
  );
}

export default Products;
