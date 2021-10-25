import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Product from "../components/Product/Product";
// import MyContext from "../MyContext";
function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  //   const url = `https://fakestoreapi.com/products/${id}`;
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((product) => {
        setProduct(product);
      });
  }, [id]);
  return (
    // <div>
    //   Product details: ID: {id}, title: {product?.title} ,image:{product?.image}
    // </div>
    <>
      <Product
        key={id}
        id={id}
        title={product?.title}
        price={product?.price}
        image={product?.image}
        category={product?.category}
      />
      <h3>{product?.description}</h3>
    </>
  );
}

export default ProductDetails;
