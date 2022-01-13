import { useContext } from "react";
import MyContext from "../../MyContext";
import "./Product.css";
import {
  getProductAmount,
  deleteProductFromCart,
  addProductToCart,
} from "../../utils/productFunctionalityUtils";
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

  return (
    //<div className="product-card">
    <Card sx={{ width: 250, margin: 1, padding: 1 }}>
      <CardActionArea
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Link to={`/Products/${id}`}>
            <CardMedia
              component="img"
              mergin-top="10"
              height="auto"
              width="auto"
              max-width="100% "
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
        </div>
        <ButtonGroup
          disableElevation
          variant="contained"
          style={{ display: "flex justify-content space-between" }}
        >
          <div>
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
              onClick={() =>
                deleteProductFromCart(productCart, setProductCart, id)
              }
            >
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
