import Product from "../Product/Product";
import "./Products.css";

function Products({ listOBJ }) {
  return (
    <section className="products">
      {listOBJ.map((item) => (
        <Product
          key={item.id}
          title={item.title}
          price={item.price}
          image={item.image}
        />
      ))}
      );
    </section>
  );
}

export default Products;
