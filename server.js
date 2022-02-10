const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json()); //middleware for post- parser our req body
app.use(express.static("client/build"));

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

const Product = mongoose.model("Product", productSchema); //class-collection
//=>name of the collection will be: products

/*get/show all products- DONE 1*/
app.get("/api/products", function (req, res) {
  const { title } = req.query;
  Product.find((err, products) => {
    if (title) {
      products = products.filter((product) =>
        product.title.toLowerCase().includes(title.toLowerCase())
      );
    }
    res.send(products);
  });
});

// /*read product by specific prams: ':id' -DONE 2*/
app.get("/api/products/:id", function (req, res) {
  const { id } = req.params;
  Product.findById(id, (err, product) => res.send(product));
});

//get by category -DONE
app.get("/api/products/:category", (req, res) => {
  const { category } = req.params;
  console.log(category);
  Product.find((err, products) => {
    if (category) {
      products = products.filter((product) => product.category === category);
    }
    res.send(products);
  });
});

//add new product DONE 3
app.post("/api/products/addProduct", (req, res) => {
  const { addProductData } = req.body;
  // console.log(req.body)
  //console.log()
  const { title, price, description, category, image } = addProductData;
  const product = new Product({
    title,
    price,
    description,
    category,
    image,
  });
  console.log("kok");
  product.save();
  res.send(product);
});

//change DONE
app.patch("/api/products/edit/:id", (req, res) => {
  console.log("got to update");
  const { id } = req.params;
  const {
    title: title,
    price: price,
    category: category,
    description: description,
    image: image,
  } = req.body;
  console.log(" update id", id);
  console.log(price);

  Product.findByIdAndUpdate(
    id,
    { title, price, category, description, image },
    { new: true } /*to return the doc after update*/,
    (err, product) => {
      res.send(product);
    }
  );
});

// Delete- DONE
app.delete("/api/products/del/:id", (req, res) => {
  const { id } = req.params;
  Product.findOneAndDelete({ _id: id }, (err, product) => res.send(product));
});

// /*slider*/
// app.get("/api/products", function (req, res) {
//   const { min, max } = req.query;
//   console.log(min, max);
//   fs.readFile("./products.json", "utf-8", (err, data) => {
//     const products = JSON.parse(data);

//     if (min && max) {
//       const x = products.filter(
//         (product) => product.price >= min && product.price <= max
//       );
//       res.send(x);
//     }
//   });
// });

const initProducts = () => {
  Product.findOne((err, product) => {
    if (!product) {
      fs.readFile("./products.json", "utf-8", (err, data) => {
        const products = JSON.parse(data);
        Product.insertMany(products, (err, resProducts) => {
          // res.send(resProducts);
        });
      });
    }
  });
};

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
  // "mongodb://localhost/test",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    app.listen(port, () => {
      initProducts();
      console.log(`app listening on port ${port}`);
    });
  }
);

// `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
