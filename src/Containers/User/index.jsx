import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { create, update, getAll } from '../../Actions/userActions';
import { clear } from '../../Actions/userFormActions';
import { updateModal } from '../../Actions/modalActions';
import "./index.sass";
import UserForm from "../../Components/UserForm";

class User extends Component {
  componentWillUnmount() {
    this.props.clear();
  }
  handleForm = form => {
    if (form.id) {
      delete form.password;
      this.props.update(form).then(res => {
        if (res.status === 200 || res.status === 201) {
          this.props.getAll();
          this.props.updateModal({
            payload: { status: false, element: <div /> }
          });
        }
      });
    } else {
      this.props.create(form).then(res => {
        if (res.status === 200 || res.status === 201) {
          this.props.getAll();
          this.props.updateModal({
            payload: { status: false, element: <div /> }
          });
        }
      });
    }
  };

  render() {
    return (
      <Grid container spacing={0} className="user-container">
        <Grid item xs={12} className="user-container__form">
          <UserForm handleForm={this.handleForm} />
        </Grid>
      </Grid>
    );
  }
}

const mD = {
  create,
  getAll,
  updateModal,
  update,
  clear,
};

export default withRouter(
  connect(
    null,
    mD
  )(User)
);
