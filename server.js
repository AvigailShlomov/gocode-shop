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
  console.log(title);
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
  console.log("hi post");
  const { title, price, description, category, image } = req.body;
  const product = new Product({
    title,
    price,
    description,
    category,
    image,
  });
  console.log("kok");
  product.save(
    { title, price, description, category, image },
    (err, product) => {
      console.log(err);
      res.send(product);
    }
  );
});

//change DONE
app.patch("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, category, description, image } = req.body;

  Product.findByIdAndUpdate(
    id,
    { title, price, category, description, image },
    { new: true },
    (err, product) => {
      res.send(product);
    }
  );
});

// Delete- DONE
app.delete("/api/products/del/:id", (req, res) => {
  console.log("check del 1");
  const { id } = req.params;
  console.log("check del 2");
  Product.findOneAndDelete({ _id: id }, (err, product) => res.send(product));
  console.log("check del 3");
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
