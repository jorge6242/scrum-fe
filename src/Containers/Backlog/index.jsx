import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import BacklogForm from "../../Components/BacklogForm";
import { create, getAll, getMainBacklog } from "../../Actions/backlogActions";
import { getAll as getUsers } from "../../Actions/userActions";
import { updateModal } from "../../Actions/modalActions";
import "./index.sass";

class Backlog extends Component {
  state = {
    show: false
  };
  componentWillMount() {
    this.props.getUsers();
    this.props.getMainBacklog();
  }

  handleForm = form => {
    form.status = 1;
    if (form.type === 1) form.assoc_backlog = 0;
    this.props.create(form).then(res => {
      if (res.status === 200 || res.status === 201) {
        this.props.getAll();
        this.props.updateModal({
          payload: { status: false, element: <div /> }
        });
      }
    });
  };

  onChange = form => {
    const { type } = form;
    let show = false;
    if (type === 2) {
      show = true;
    } else {
      show = false;
    }
    this.setState({ show });
  };

  render() {
    const { projects, sprints, users, mainBacklogs } = this.props;
    const { show } = this.state;
    return (
      <Grid container spacing={0} className="backlog-container">
        <Grid item xs={12} className="backlog-container__form">
          <BacklogForm
            handleForm={this.handleForm}
            projects={projects}
            sprints={sprints}
            users={users}
            mainBacklogs={mainBacklogs}
            onChange={this.onChange}
            show={show}
          />
        </Grid>
      </Grid>
    );
  }
}

const mS = ({
  projectReducer: { projects },
  sprintReducer: { sprints },
  userReducer: { users },
  backlogReducer: { mainBacklogs }
}) => ({
  projects,
  sprints,
  users,
  mainBacklogs
});

const mD = {
  create,
  getAll,
  updateModal,
  getUsers,
  getMainBacklog
};

export default withRouter(
  connect(
    mS,
    mD
  )(Backlog)
);
