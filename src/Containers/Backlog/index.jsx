import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import BacklogForm from "../../Components/BacklogForm";
import {
  create,
  getAll,
  getMainBacklog,
  getMainBacklogFromSprint,
  update,
} from "../../Actions/backlogActions";
import { clear } from '../../Actions/backlogFormActions';
import { getAll as getUsers } from "../../Actions/userActions";
import { getSprintsProject } from "../../Actions/sprintActions";
import { updateModal } from "../../Actions/modalActions";
import "./index.sass";

class Backlog extends Component {
  state = {
    show: false,
    showSprints: false,
    showBacklogs: false
  };
  componentWillMount() {
    this.props.getUsers();
  }

  componentWillUnmount() {
    this.props.clear();
  }

  handleForm = form => {
    const { title } = this.props;
    if (form.id > 0) {
      this.props.update(form, title).then(res => {
        if (res.status === 200 || res.status === 201) {
          this.props.getAll();
          this.props.updateModal({
            payload: { status: false, element: <div /> }
          });
        }
      });
    } else {
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
    }
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

  handleProject = event => {
    if (event.target.value > 0) {
      this.props.getSprintsProject(event.target.value).then(res => {
        if (res.length > 0) {
          this.setState({
            showSprints: true,
            showBacklogs: false,
            show: false
          });
        } else {
          this.setState({ showSprints: false, showBacklogs: false });
        }
      });
    }
  };

  handleSprint = event => {
    if (event.target.value > 0) {
      this.props.getMainBacklogFromSprint(event.target.value).then(res => {
        if (res.length > 0) {
          this.setState({ showBacklogs: true });
        } else {
          this.setState({ showBacklogs: false });
        }
      });
    }
  };

  render() {
    const {
      projects,
      sprints,
      users,
      mainBacklogs,
      sprintsProject,
      mainBacklogFromSprint
    } = this.props;
    const { show, showSprints, showBacklogs } = this.state;
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
            showSprints={showSprints}
            sprintsProject={sprintsProject}
            mainBacklogFromSprint={mainBacklogFromSprint}
            showBacklogs={showBacklogs}
            handleProject={this.handleProject}
            handleSprint={this.handleSprint}
          />
        </Grid>
      </Grid>
    );
  }
}

const mS = ({
  projectReducer: { projects },
  sprintReducer: { sprints, sprintsProject },
  userReducer: { users },
  backlogReducer: { mainBacklogs, mainBacklogFromSprint },
  modalReducer: { title },
}) => ({
  projects,
  sprints,
  users,
  mainBacklogs,
  sprintsProject,
  mainBacklogFromSprint,
  title,
});

const mD = {
  create,
  getAll,
  updateModal,
  getUsers,
  getMainBacklog,
  getSprintsProject,
  getMainBacklogFromSprint,
  update,
  clear,
};

export default withRouter(
  connect(
    mS,
    mD
  )(Backlog)
);
