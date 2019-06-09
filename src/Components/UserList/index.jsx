import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { getAll, updateList } from '../../Actions/userActions';
import './index.sass';
import { Grid } from '@material-ui/core';

const styles = {
    avatar: {
      margin: 10,
      width: '100px',
      height: '100px',
    },
    icon: {
      width: '100px',
      height: '100px',
    },
    orangeAvatar: {
      margin: 10,
      color: '#fff',
      backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
      margin: 10,
      color: '#fff',
      backgroundColor: deepPurple[500],
    },
    active: {
      backgroundColor: deepOrange[500],
    }
  };
  

class UserList extends Component {
    componentWillMount() {
        this.props.getAll();
    }

    handleUserSelect = key => {
      const { users } = this.props;
      if (users[key].check) {
        users[key].check = false;
      } else {
        users[key].check = true;
      }
      this.props.updateList(users);
      this.forceUpdate();
    }

    renderUsers = (user, key) => {
      const { users, classes } = this.props;
      const checkUser = users[key];
      const check = checkUser.check ? 'active' : '';
      return (
        <div key={key} className={`user-container ${check}`} onClick={() => this.handleUserSelect(key)}>
          <div className="avatar"><Avatar className={classes.avatar}><FaceIcon className={classes.icon} /></Avatar></div>
          <div className="title">{user.name}</div>
        </div>
      )
    }

    render() {
        const { users } = this.props;
        return (
          <Grid
            container
            justify="center"
            alignItems="center"
            className="user-list-container"
          >
            {users.map((user, index) => this.renderUsers(user, index))}
          </Grid>
        );
    }
}

const mS = ({ userReducer: { users }, teamReducer: { usersToAddTeam } }) => ({
  users,
  usersToAddTeam
});

const mD = {
    getAll,
    updateList,
}

export default withStyles(styles)(connect(mS,mD)(UserList));