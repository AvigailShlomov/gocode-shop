import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ReadOnlyRow = ({ product, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{product.title}</td>
      <td>{product.price}</td>
      <td>{product.description}</td>
      <td>{product.category}</td>

      <td>{product.image}</td>

      <td>
        <IconButton
          type="button"
          onClick={(event) => handleEditClick(event, product)}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          aria-label="delete"
          type="button"
          onClick={() => handleDeleteClick(product.id)}
        >
          <DeleteIcon />
        </IconButton>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
