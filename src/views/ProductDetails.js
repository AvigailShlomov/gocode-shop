import { useEffect, useState } from "react";
import { useParams } from "react-router";
// import MyContext from "../MyContext";
function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  //   const url = `https://fakestoreapi.com/products/${id}`;
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((product) => {
        setProduct(product);
      });
  }, [id]);
  return (
    <div>
      Todo details: ID: {id}, title: {product?.title}
    </div>
  );
}

export default ProductDetails;
