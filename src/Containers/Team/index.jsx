import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { create, getAll } from '../../Actions/teamActions';
import { clear } from '../../Actions/teamFormActions';
import { updateModal } from '../../Actions/modalActions';
import "./index.sass";
import TeamForm from "../../Components/TeamForm";

class Team extends Component {
  componentWillUnmount() {
    this.props.clear();
  }
  handleForm = form => {
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
    return (
      <Grid container spacing={0} className="team-container">
        <Grid item xs={12} className="team-container__form">
          <TeamForm handleForm={this.handleForm} />
        </Grid>
      </Grid>
    );
  }
}

const mD = {
  create,
  getAll,
  updateModal,
  clear
};

export default withRouter(
  connect(
    null,
    mD
  )(Team)
);
