import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import ProjectForm from "../../Components/ProjectForm";
import { create, getAll, update } from "../../Actions/projectActions";
import { clear } from '../../Actions/projectFormActions';
import { updateModal } from "../../Actions/modalActions";
import { validateRange } from "../../helpers/date";
import snackBarStatus from "../../Actions/snackbarActions";
import "./index.sass";

class Project extends Component {
  componentWillUnmount() {
    this.props.clear();
  }
  handleForm = form => {
    if (validateRange(form.start_date, form.end_date)) {
      if (form.id > 0) {
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
    } else {
      this.props.snackBarStatus({
        payload: {
          title: "La fecha de inicio debe ser menor a la fecha fin",
          type: "error",
          enable: true
        }
      });
    }
  };

  render() {
    return (
      <Grid container spacing={0} className="project-container">
        <Grid item xs={12} className="project-container__form">
          <ProjectForm
            handleForm={this.handleForm}
            handleDateStart={this.handleDateStart}
            handleDateEnd={this.handleDateEnd}
          />
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
  snackBarStatus,
  clear,
};

export default withRouter(
  connect(
    null,
    mD
  )(Project)
);
