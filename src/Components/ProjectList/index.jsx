import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import { getAll, get } from "../../Actions/projectActions";
import { updateModal } from '../../Actions/modalActions';
import Item from "./Item";
import "./index.sass";
import Project from "../../Containers/Project";

class ProjectList extends Component {
  componentWillMount() {
    this.props.getAll();
  }
  handleEdit = project => {
    this.props.get(project.id);
    this.props.updateModal({
      payload: { status: true, title: "Sprint", element: <Project /> }
    });
  };
  getEstimation = (start, end) => {
    let date1 = moment(start);
    let date2 = moment(end);
    return Math.abs(date1.diff(date2, 'days'));
  }
  render() {
    const { projects } = this.props;
    return (
      <Grid container spacing={0} className="projects-container">
        <Grid item xs={12}>
          Proyectos
        </Grid>
        <Grid container spacing={0} className="projects-container__list">
        {projects.map((project, index) => (
          <Item
            key={index}
            project={project}
            duration="Duration 1"
            handleEdit={this.handleEdit}
            getEstimation={this.getEstimation}
          />
        ))}
        </Grid>
      </Grid>
    );
  }
}

const mS = ({ projectReducer: { projects } }) => ({ projects });

const mD = {
  getAll,
  get,
  updateModal,
};

export default connect(
  mS,
  mD
)(ProjectList);
