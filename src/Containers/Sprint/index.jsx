import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import SprintForm from "../../Components/SprintForm";
import { create, getAll, update } from "../../Actions/sprintActions";
import { clear } from '../../Actions/sprintFormActions';
import { updateModal } from "../../Actions/modalActions";
import { validateRange } from "../../helpers/date";
import snackBarStatus from "../../Actions/snackbarActions";
import "./index.sass";

class Sprint extends Component {
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
        form.status = 1;
        form.availables_days = 2;
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
    const { projects } = this.props;
    return (
      <Grid container spacing={0} className="sprint-container">
        <Grid item xs={12} className="sprint-container__form">
          <SprintForm handleForm={this.handleForm} projects={projects} />
        </Grid>
      </Grid>
    );
  }
}

const mS = ({ projectReducer: { projects } }) => ({ projects });

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
    mS,
    mD
  )(Sprint)
);
