const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json()); //middleware for post- parser our req body
app.use(express.static("client/build"));

const ProductSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  category: String,
  image: String,
});

const Product = mongoose.model("Product", ProductSchema); //class-collection

/*read/receive all the data 8.1*/
app.get("/api/products", function (req, res) {
  fs.readFile("./products.json", "utf-8", (err, data) => {
    const products = JSON.parse(data);
    res.send(products);
  });
});

// /*read product by specific prams: ':id' 8.3 */

// app.get("/api/products/:id", function (req, res) {
//   const { id } = req.params;
//   fs.readFile("./products.json", "utf-8", (err, data) => {
//     const products = JSON.parse(data);
//     const product = products.find((prdt) => prdt.id === +id);
//     res.send(product);
//   });
// });

// /*get by a string 8.2 */
// app.get("/api/products", function (req, res) {
//   const { title } = req.query;
//   console.log(title);
//   fs.readFile("./products.json", "utf-8", (err, data) => {
//     const products = JSON.parse(data);
//     if (title) {
//       const x = products.filter((product) =>
//         product.title.toLowerCase().includes(title.toLowerCase())
//       );
//       res.send(x);
//     }
//     res.send("Nothing found");
//   });
// });

// /*slider*/
app.get("/api/products", function (req, res) {
  const { min, max } = req.query;
  console.log(min, max);
  fs.readFile("./products.json", "utf-8", (err, data) => {
    const products = JSON.parse(data);

    if (min && max) {
      const x = products.filter(
        (product) => product.price >= min && product.price <= max
      );
      res.send(x);
    }
  });
});

//add new product 8.4
app.post("/api/products/addProduct", (req, res) => {
  const { title, price, description, category, image, rating, rate, count } =
    req.body;
  Product.save(
    { title, price, description, category, image },
    (err, product) => {
      res.send(product);
    }
  );

  // const product = new Product({ title, price, description, category, image });
  // product.save((err, product) => {
  //   res.send(product);
  // });
  // fs.readFile("./products.json", "utf-8", (err, data) => {
  //   const products = JSON.parse(data);
  //   products.push({
  //     id: products.length + 1,
  //     title,
  //     price,
  //     description,
  //     category,
  //     image,
  //     rating,
  //     rate,
  //     count,
  //   });
  //   fs.writeFile("./products.json", JSON.stringify(products), (err) => {
  //     res.send(products);
  //   });
  // });
});

//change price 8.5
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  fs.readFile("./products.json", "utf-8", (err, data) => {
    const products = JSON.parse(data);
    const productIndex = products.findIndex((product) => product.id === +id);
    products[productIndex].price = price;
    fs.writeFile("./products.json", JSON.stringify(products), (err) => {
      if (err) {
        res.send("ERROR!! Request not valid");
      }
      res.send(products[productIndex]);
    });
  });
});

// // delete a product 8.6
// app.delete("/api/products/:id", (req, res) => {
//   const { id } = req.params;
//   fs.readFile("./products.json", "utf-8", (err, data) => {
//     const products = JSON.parse(data);
//     const productIndex = products.findIndex((product) => product.id === +id);
//     products.splice(productIndex, 1);
//     fs.writeFile("./products.json", JSON.stringify(products), (err) => {
//       if (err) {
//         res.send("ERROR!! Request not valid");
//       }
//       res.send(products);
//     });
//   });
// });

// app.get('/api/products/:category', (req, res) => {
//   const {category} = req.params;
//   console.log(category);
//  fs.readFile('./products.json','utf8',(err,data)=>{
//      const products=JSON.parse(data);
//      const productsByCategory = products.filter(product=>product.category === category)
//      res.send(productsByCategory);
//  })

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
      console.log(`app listening on port ${port}`);
    });
  }
);
