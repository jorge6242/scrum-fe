import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import BacklogForm from "../../Components/BacklogForm";
import { create, getAll } from '../../Actions/backlogActions';
import {  getAll as getUsers } from '../../Actions/userActions';
import { updateModal } from '../../Actions/modalActions';
import "./index.sass";

class Backlog extends Component {

 componentWillMount() {
  this.props.getUsers();
 }

  handleForm = form => {
    form.status = 1;
    form.assoc_backlog = 1;
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
   const { projects, sprints, users } = this.props;
    return (
      <Grid container spacing={0} className="backlog-container">
        <Grid item xs={12} className="backlog-container__form">
          <BacklogForm handleForm={this.handleForm} projects={projects} sprints={sprints} users={users} />
        </Grid>
      </Grid>
    );
  }
}

const mS = ({ projectReducer: { projects }, sprintReducer: { sprints }, userReducer: { users } }) => ({
  projects,
  sprints,
  users,
});

const mD = {
  create,
  getAll,
  updateModal,
  getUsers,
};

export default withRouter(
  connect(
    mS,
    mD
  )(Backlog)
);
