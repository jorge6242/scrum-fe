import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { update, getMainBacklogSprint } from "../../Actions/backlogActions";
import { updateModal } from "../../Actions/modalActions";
import "./index.sass";
import TaskForm from "../../Components/TaskForm";

class Task extends Component {
  handleForm = form => {
    const { selectedProject } = this.props;
    this.props.update(form).then(res => {
      if (res.status === 200 || res.status === 201) {
        this.props.getMainBacklogSprint(selectedProject.id);
        this.props.updateModal({
          payload: { status: false, element: <div /> }
        });
      }
    });
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

const mS = ({ projectReducer: { selectedProject } }) => ({ selectedProject });

const mD = {
  update,
  getMainBacklogSprint,
  updateModal
};

export default connect(
  mS,
  mD
)(Task);
