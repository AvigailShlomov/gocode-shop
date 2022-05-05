import { useContext, useEffect, useState } from "react";
import MyContext from "../../MyContext";
import ProductCart from "../ProductCart/ProductCart";
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function Cart() {
  const [productCart, setProductCart] = useContext(MyContext);
  const [cartLength, setCartLength] = useState(0);
  useEffect(() => {
    setCartLength(
      typeof productCart.length === "undefined" ? 0 : productCart.length
    );
    console.log("lennnnnn", productCart.length);
    console.log("type of", typeof productCart);
  }, [productCart]);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }
  let finalPrice = 0;
  function totalPrice() {
    productCart.map(
      (item) => (finalPrice = finalPrice + item.amount * item.price)
    );
    return roundToTwo(finalPrice);
  }
  // let len = typeof productCart.lenght === "undefined" ? 0 : productCart.lenght;
  // console.log("len", cartLenght);
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {cartLength === 0 && <h1>Your cart is Empty</h1>}
      <div>
        {cartLength > 0 && (
          <h5>
            <strong>My Cart, </strong>
            {cartLength} items{" "}
          </h5>
        )}

        <Divider />
        {/* {productCart.length > 0 && <h1>Your cart is Empty</h1>} */}
        {productCart.map((item) => (
          <ProductCart
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            category={item.category}
            amount={item.amount}
          />
        ))}
        <Divider />
        {cartLength > 0 && <h5>Sub-Total: {totalPrice()} $</h5>}
      </div>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Your Cart </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Cart;
