import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomEmail,
  randomTraderName,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";
import { Button, formGroupClasses } from "@mui/material";

// function validateEmail(email) {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }

export default function Admin() {
  const [rows, setRows] = useState([]);
  const [addProductData, setAddProductData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        return res.json();
      })
      .then((products) => {
        let newProducts = products.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        }));
        newProducts = newProducts.map((product) => ({
          ...product,
          editOnClick: () => {
            console.log(product.id, "ho");
          },
        }));

        setRows(newProducts);
      });
  }, []);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newProductData = { ...addProductData };
    newProductData[fieldName] = fieldValue;
    setAddProductData(newProductData);
  };

  const handleAddProduct = () => {
    console.log("hi got to add btn ", addProductData);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addProductData }),
    };

    fetch("/api/products/addProduct", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const x = [data];
        const newProducts = x.map(({ _id, ...rest }) => ({
          id: _id,
          ...rest,
        }));
        setRows([...newProducts, ...rows]);
      });
  };

  return (
    <Box
      sx={{
        height: 600,
        width: 1,
        "& .MuiDataGrid-cell--editing": {
          bgcolor: "rgb(255,215,115, 0.19)",
          color: "#1a3e72",
        },
        "& .Mui-error": {
          bgcolor: (theme) =>
            `rgb(126,10,15, ${theme.palette.mode === "dark" ? 0 : 0.1})`,
          color: (theme) =>
            theme.palette.mode === "dark" ? "#ff4343" : "#750f0f",
        },
      }}
    >
      {console.log("columns", columns)}
      {console.log("rows before dg", rows)}
      <DataGrid rows={rows} columns={columns} />
      <br />
      <h2>Add A Product:</h2>
      <input
        type="text"
        name="title"
        required="required"
        placeholder="Enter a title..."
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="category"
        required="required"
        placeholder="Enter a category..."
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="description"
        required="required"
        placeholder="Enter a description..."
        onChange={handleAddFormChange}
      />
      <input
        type="number"
        name="price"
        required="required"
        placeholder="Enter a price..."
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="image"
        required="required"
        placeholder="Enter a image URL..."
        onChange={handleAddFormChange}
      />
      <button onClick={handleAddProduct}>ADD</button>
    </Box>
  );
}

const columns = [
  // {
  //   field: "_id",
  //   headerName: "ID",
  //   type: "string",
  //   width: 180,
  //   editable: false,
  // },

  {
    field: "title",
    headerName: "Title",
    type: "string",
    width: 300,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 80,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    type: "string",
    width: 330,
    editable: true,
  },
  {
    field: "category",
    headerName: "Category",
    type: "string",
    width: 130,
    editable: true,
  },
  {
    field: "image",
    headerName: "ImageURL",
    type: "string",
    width: 350,
    editable: true,
  },
  {
    field: "action",
    headerName: "Action",
    type: "string",
    width: 350,
    editable: true,
  },
];

// const rows = [
//   {
//     id: 1,
//     name: randomTraderName(),
//     email: randomEmail(),
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 2,
//     name: randomTraderName(),
//     email: randomEmail(),
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 3,
//     name: randomTraderName(),
//     email: randomEmail(),
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 4,
//     name: randomTraderName(),
//     email: randomEmail(),
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 5,
//     name: randomTraderName(),
//     email: randomEmail(),
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
// ];
