import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import SprintForm from "../../Components/SprintForm";
import { create, getAll } from '../../Actions/sprintActions';
import { updateModal } from '../../Actions/modalActions';
import "./index.sass";

class Sprint extends Component {
  handleForm = form => {
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
};

export default withRouter(
  connect(
    mS,
    mD
  )(Sprint)
);
