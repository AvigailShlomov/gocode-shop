import { Fragment, useEffect, useState } from "react";
import EditableRow from "../../components/EditableRow/EditableRow";
import Read from "../../components/Read/Read";
// import ReadOnlyRow from "../../components/Read/Read";
import "./admin.css";

const Admin = () => {
  const [products, setProducts] = useState([]);
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
        // newProducts = newProducts.map((product) => ({
        //   ...product,
        //   editOnClick: () => {
        //     console.log(product.id, "ho");
        //   },
        // }));
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
        setProducts([...newProducts, ...products]);
      });
  };

  const [editContactId, setEditContactId] = useState(null);
  const [editProductId, setEditProfuctId] = useState(null);

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

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...products];

    const index = products.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setProducts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  // const handleDeleteClick = (contactId) => {
  //   const newContacts = [...products];

  //   const index = products.findIndex((contact) => contact.id === contactId);

  //   newContacts.splice(index, 1);

  //   setProducts(newContacts);
  // };

  return (
    <div className="app-container">
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
              <Fragment>
                {editContactId === product.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <Read
                    product={product}
                    handleEditClick={handleEditClick}
                    //handleDeleteClick={handleDeleteClick}
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
