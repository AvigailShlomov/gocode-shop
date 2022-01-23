export function getProductAmount(productCart, id) {
  let product = productCart.find((prdt) => prdt.id === id);
  if (product) {
    return product.amount;
  }
  return 0;
}

//productCart, id,  image,title,price,category,

let newProduct = "";

export function addProductToCart(
  productCart,
  setProductCart,
  id,
  image,
  title,
  price,
  category
) {
  let amount = 1;
  const found = productCart.find((el) => el.id === id);
  if (found) {
    console.log("got here", productCart);
    setProductCart(
      productCart.map((product) =>
        product.id === id ? { ...product, amount: product.amount + 1 } : product
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

export function deleteProductFromCart(productCart, setProductCart, id) {
  productCart.forEach((product) => {
    if (product.id === id) {
      if (product.amount === 1) {
        setProductCart(productCart.filter((x) => x.id !== id));
      } else {
        setProductCart(
          productCart.map(function deleteProduct(product) {
            if (product.id === id)
              return { ...product, amount: product.amount - 1 };
            else return product;
          })
        );
      }
    }
  });
  return;
}
