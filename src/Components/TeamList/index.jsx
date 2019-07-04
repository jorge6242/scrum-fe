import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import FaceIcon from "@material-ui/icons/Face";
import { withStyles } from "@material-ui/core/styles";
import { getAll, createUsersTeam } from "../../Actions/teamActions";
import { getAll as getAllUsers } from "../../Actions/userActions";
import "./index.sass";
import Item from "./Item";

const styles = {
  avatar: {
    margin: 10,
    width: "50px",
    height: "50px"
  },
  icon: {
    width: "50px",
    height: "50px"
  }
};

class TeamList extends Component {
  componentWillMount() {
    this.props.getAll();
  }

  handleSelect = team => {
    const { users } = this.props;
    const usersSelected = [];
    const filterUsers = users.filter(user => user.check);
    if (filterUsers.length > 0) {
      filterUsers.forEach(user => {
        usersSelected.push({ id: user.id });
      });
      const data = {
        team: team.id,
        users: usersSelected
      };
      this.props.createUsersTeam(data).then(res => {
        if (res.status === 200 || res.status === 201) {
          this.props.getAll();
          this.props.getAllUsers();
        }
      });
    }
  };

  handleUserRemove = user => {
    console.log("user ", user);
  };

  renderUsers = (user, key) => {
    const { classes } = this.props;
    return (
      <div
        key={key}
        className={`user-container`}
        onClick={() => this.handleUserRemove(user)}
      >
        <div className="avatar">
          <Avatar className={classes.avatar}>
            <FaceIcon className={classes.icon} />
          </Avatar>
        </div>
        <div className="title">{user.name}</div>
      </div>
    );
  };

  render() {
    const { teams } = this.props;
    return (
      <Grid container spacing={0} className="teams-container">
        {teams.map((team, index) => (
          <Item
            key={index}
            team={team}
            handleSelect={this.handleSelect}
            users={team.users}
            renderUsers={this.renderUsers}
          />
        ))}
      </Grid>
    );
  }
}

const mS = ({ teamReducer: { teams }, userReducer: { users } }) => ({
  teams,
  users
});

const mD = {
  getAll,
  getAllUsers,
  createUsersTeam
};

export default withStyles(styles)(
  connect(
    mS,
    mD
  )(TeamList)
);
