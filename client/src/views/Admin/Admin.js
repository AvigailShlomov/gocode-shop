import { Fragment, useEffect, useState } from "react";
import EditableRow from "../../components/EditableRow/EditableRow";
import ReadOnlyRow from "../../components/ReadOnlyRow/ReadOnlyRow";
import "./admin.css";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  ////////////////////////////////ADD////////////////////////////////////
  const [addProductData, setAddProductData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const [editFormData, setEditFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });
  //GET
  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        return res.json();
      })
      .then((products) => {
        const newProducts = products.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        }));
        setProducts(newProducts);
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
  //POST
  const handleAddProduct = (event) => {
    event.preventDefault();
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
        setProducts([...products, ...newProducts]);
      });
  };
  ////////////////////////EDIT/////////////////////////////////////////////

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedProduct = {
      id: editProductId,
      title: editFormData.title,
      price: editFormData.price,
      category: editFormData.category,
      description: editFormData.description,
      image: editFormData.image,
    };

    const newProducts = [...products];
    const index = products.findIndex((product) => product.id === editProductId); //to get the changed position
    newProducts[index] = editedProduct;
    setProducts(newProducts);
    // console.log("update", newProducts);
    // console.log("what we gonna update", editedProduct);
    // console.log("id", editProductId);

    fetch(`/api/products/edit/${editProductId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: editedProduct?.title,
        price: editedProduct?.price,
        category: editedProduct?.category,
        description: editedProduct?.description,
        image: editedProduct?.image,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log("json", json))
      .catch((err) => console.log("error: ", err));

    setEditProductId(null);
  };
  //EDIT BTN
  const handleEditClick = (event, product) => {
    event.preventDefault();
    setEditProductId(product.id);
    const formValues = {
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
    };
    setEditFormData(formValues);
  };
  //edit-cancel
  const handleCancelClick = () => {
    setEditProductId(null);
  };
  //del btn
  const handleDeleteClick = (productId) => {
    console.log("hi got to del");
    const filteredProducts = products.filter((pro) => pro.id !== productId);
    setProducts(filteredProducts);
    fetch(`/api/products/del/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) =>
        // this is the data we get afte deletting
        console.log(data)
      );
  };

  return (
    <div className="content-table">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <Fragment key={product.id}>
                {editProductId === product.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    product={product}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add A Product:</h2>
      <form onSubmit={(event) => handleAddProduct(event)}>
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
      </form>
    </div>
  );
};

export default Admin;
