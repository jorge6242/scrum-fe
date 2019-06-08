import React from "react";
import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const ProductList = ({ product: { name, id }, handleEdit }) => (
  <TableRow onClick={() => handleEdit(id)}>
    <TableCell align="left">{name}</TableCell>
  </TableRow>
);

ProductList.propTypes = {
  handleEdit: PropTypes.func.isRequired
};

export default ProductList;
