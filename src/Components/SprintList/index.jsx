import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getAll, get } from "../../Actions/sprintActions";
import { updateModal } from "../../Actions/modalActions";
import Item from "./Item";
import "./index.sass";
import Sprint from "../../Containers/Sprint";

class SprintList extends Component {
  componentWillMount() {
    this.props.getAll();
  }

  renderStatus = status => {
    switch (status) {
      case 1:
        return "Sin Asignar";
      case 2:
        return "En Progreso";
      case 3:
        return "Culminado";
      default:
        return "Sin Asignar";
    }
  };

  handleEdit = sprint => {
    this.props.get(sprint.id);
    this.props.updateModal({
      payload: { status: true, title: "Sprint", element: <Sprint /> }
    });
  };

  render() {
    const { sprints } = this.props;
    return (
      <Grid container spacing={0} className="sprint-container">
        <Grid item xs={12}>
          Sprints
        </Grid>
        {sprints.map((sprint, index) => (
          <Item
            key={index}
            sprint={sprint}
            renderStatus={this.renderStatus}
            handleEdit={this.handleEdit}
          />
        ))}
      </Grid>
    );
  }
}

const mS = ({ sprintReducer: { sprints } }) => ({ sprints });

const mD = {
  getAll,
  get,
  updateModal
};

export default connect(
  mS,
  mD
)(SprintList);
