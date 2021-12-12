import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Product from "../components/Product/Product";
// import MyContext from "../MyContext";
function ProductDetails() {
  const { id: _id } = useParams();
  const [product, setProduct] = useState({});
  //   const url = `https://fakestoreapi.com/products/${id}`;
  useEffect(() => {
    fetch(`/api/products/${_id}`)
      .then((res) => res.json())
      .then((product) => {
        setProduct(product);
      });
  }, [_id]);
  return (
    // <div>
    //   Product details: ID: {id}, title: {product?.title} ,image:{product?.image}
    // </div>
    <>
      <Product
        key={_id}
        id={_id}
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
