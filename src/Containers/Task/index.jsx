import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { create, getAll } from "../../Actions/teamActions";
import { updateModal } from "../../Actions/modalActions";
import "./index.sass";
import TaskForm from "../../Components/TaskForm";

class Task extends Component {
  handleForm = form => {
      console.log('form ', form);
  };

  render() {
    return (
      <Grid container spacing={0} className="task-container">
        <Grid item xs={12} className="task-container__form">
          <TaskForm handleForm={this.handleForm} />
        </Grid>
      </Grid>
    );
  }
}

const mD = {
  create,
  getAll,
  updateModal
};

export default connect(
  null,
  mD
)(Task);
