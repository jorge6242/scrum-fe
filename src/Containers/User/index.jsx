import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { create, getAll } from '../../Actions/userActions';
import { updateModal } from '../../Actions/modalActions';
import "./index.sass";
import UserForm from "../../Components/UserForm";

class User extends Component {
  handleForm = form => {
    this.props.create(form).then(res => {
      if (res.status === 200 || res.status === 201) {
        this.props.getAll();
        this.props.updateModal({
          payload: { status: false, element: <div /> }
        });
      }
    });
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
};

export default withRouter(
  connect(
    null,
    mD
  )(User)
);
