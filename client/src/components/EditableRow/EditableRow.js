import React from "react";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
// import "./editableRow.css";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a title..."
          name="title"
          value={editFormData.title}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a price..."
          name="price"
          value={editFormData.price}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a description..."
          name="description"
          value={editFormData.description}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a categoty..."
          name="category"
          value={editFormData.category}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an Image URL..."
          name="image"
          value={editFormData.image}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <IconButton type="submit">
          <SaveIcon />
        </IconButton>

        <IconButton type="button" onClick={handleCancelClick}>
          <CancelIcon />
        </IconButton>
      </td>
    </tr>
  );
};

export default EditableRow;
