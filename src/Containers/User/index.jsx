import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { create, update, getAll } from '../../Actions/userActions';
import { clear } from '../../Actions/userFormActions';
import { updateModal } from '../../Actions/modalActions';
import "./index.sass";
import UserForm from "../../Components/UserForm";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "50%"
  }
});

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
    const { roles, classes } = this.props;
    return (
      <Grid container spacing={0} className="user-container">
        <Grid item xs={12} className="user-container__form">
          <UserForm handleForm={this.handleForm} roles={roles} classes={classes} />
        </Grid>
      </Grid>
    );
  }
}

const mS = ({ roleReducer: { roles } }) => ({ roles });

const mD = {
  create,
  getAll,
  updateModal,
  update,
  clear,
};

export default withStyles(styles)(
  connect(
    mS,
    mD
  )(User)
);
