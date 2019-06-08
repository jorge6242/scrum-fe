import React, { Component } from "react";
import { connect } from "react-redux";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import { updateModal } from "../../Actions/modalActions";
import { clear, setEdit } from "../../Actions/productFormActions";
import { create, getAll, update, remove } from "../../Actions/productActions";
import "./index.sass";
import ProductForm from "../../Components/ProductForm";

class Product extends Component {
  handleReminderForm = form => {
    console.log("form.id ", form.id);
    if (form.id === "") {
      this.props.create(form).then(res => {
        if (res.status === 200 || res.status === 201) {
          this.props.getAll();
          this.props.updateModal({
            payload: { status: false, element: <div /> }
          });
        }
      });
    } else {
      this.props.update(form).then(res => {
        if (res.status === 200 || res.status === 201) {
          this.props.getAll();
          this.props.updateModal({
            payload: { status: false, element: <div /> }
          });
        }
      });
    }
  };

  handleClose = () => {
    this.props.updateModal({ payload: { status: false, element: <div /> } });
    this.props.clear();
  };

  handleRemove = () => {
    const { productFormReducer } = this.props;
    this.props.remove(productFormReducer.id).then(res => {
      if (res.status === 200 || res.status === 201) {
        this.props.getAll();
        this.props.updateModal({
          payload: { status: false, element: <div /> }
        });
      }
    });
    this.props.clear();
  };

  changeColor = color => {
    const { productFormReducer } = this.props;
    productFormReducer.color = color;
    this.props.setEdit(productFormReducer);
  };

  render() {
    const { productFormReducer } = this.props;
    return (
      <Grid container spacing={0} className="reminder-container">
        <Grid container spacing={0}>
          <Grid
            item
            xs={2}
            className="reminder-container__close"
            onClick={() => this.handleClose()}
          >
            <ClearIcon />
          </Grid>
          <Grid item xs={8} className="reminder-container__title">
            Product
          </Grid>
          <Grid item xs={2} className="reminder-container__delete">
            {productFormReducer.id !== "" && (
              <DeleteIcon onClick={() => this.handleRemove()} />
            )}
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <ProductForm
              handleReminderForm={this.handleReminderForm}
              changeColor={this.changeColor}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mS = ({ productFormReducer }) => ({ productFormReducer });

const mD = {
  updateModal,
  setEdit,
  clear,
  create,
  getAll,
  update,
  remove
};

export default connect(
  mS,
  mD
)(Product);
