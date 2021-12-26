import { useContext, useState } from "react";
import MyContext from "../../MyContext";
// import ProductCart from "../ProductCart";
import "./Product.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, ButtonGroup } from "@mui/material";

function Product({ key, id, title, price, category, image }) {
  const [productCart, setProductCart] = useContext(MyContext);
  // const [amount, setAmount] = useState(0);
  // const [quantity, setQuantity] = useState(0);

  let getProductAmount = () => {
    let product = productCart.find((prdt) => prdt.id === id);
    if (product) {
      return product.amount;
    }
    return 0;
  };

  let newProduct = "";
  function addProductToCart() {
    let amount = 1;
    const found = productCart.find((el) => el.id === id);
    if (found) {
      console.log("got here");
      setProductCart(
        productCart.map((product) =>
          product.id === id
            ? { ...product, amount: product.amount + 1 }
            : product
        )
      );
    } else {
      newProduct = {
        key: id,
        id,
        image,
        title,
        price,
        category,
        amount,
      };
      setProductCart([...productCart, newProduct]);
    }

    return;
  }

  function deleteProduct(product) {
    if (product.id === id) return { ...product, amount: product.amount - 1 };
    else return product;
  }
  function deleteProductFromCart() {
    productCart.forEach((product) => {
      if (product.id === id) {
        if (product.amount === 1) {
          setProductCart(productCart.filter((x) => x.id !== id));
        } else {
          setProductCart(productCart.map(deleteProduct));
        }
      }
    });
    return;
  }

  return (
    //<div className="product-card">
    <Card sx={{ width: 250, hight: 5, margin: 1, padding: 1 }}>
      <CardActionArea>
        <Link to={`/Products/${id}`}>
          <CardMedia
            component="img"
            mergin-top="10"
            height="230"
            image={image}
            alt={title}
          />
        </Link>
        <CardContent>
          <Link to={`/Products/${id}`}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          </Link>

          <Typography variant="body2" color="text.secondary">
            {category}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {price} $
          </Typography>
        </CardContent>
        <ButtonGroup disableElevation variant="contained">
          <div>
            <Button
              color="success"
              onClick={() => {
                addProductToCart();
              }}
            >
              {" "}
              +{" "}
            </Button>
            <span>{getProductAmount()}</span>
            <Button color="primary" onClick={() => deleteProductFromCart()}>
              {" "}
              -{" "}
            </Button>
          </div>
        </ButtonGroup>
      </CardActionArea>
    </Card>

    // {/* <Link to={`/Products/${id}`}>
    //   <div className="product-image">
    //     <img src={image} alt={title} />
    //     <div className="product-info">
    //       <h5>{title}</h5>
    //     </div>
    //   </div>
    // </Link>
    // <div className="product-info">
    //   <h6>{category}</h6>
    //   <h6>{price}$</h6>
    // </div> */}
    // </div>
  );
}

export default Product;
