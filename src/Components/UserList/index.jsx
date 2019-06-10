import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { getUsersAvailable, updateList } from '../../Actions/userActions';
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
        this.props.getUsersAvailable();
    }

    handleUserSelect = key => {
      const { usersAvailable } = this.props;
      if (usersAvailable[key].check) {
        usersAvailable[key].check = false;
      } else {
        usersAvailable[key].check = true;
      }
      this.props.updateList(usersAvailable);
      this.forceUpdate();
    }

    renderUsers = (user, key) => {
      const { usersAvailable, classes } = this.props;
      const checkUser = usersAvailable[key];
      const check = checkUser.check ? 'active' : '';
      return (
        <div key={key} className={`user-container ${check}`} onClick={() => this.handleUserSelect(key)}>
          <div className="avatar"><Avatar className={classes.avatar}><FaceIcon className={classes.icon} /></Avatar></div>
          <div className="title">{user.name}</div>
        </div>
      )
    }

    render() {
        const { usersAvailable } = this.props;
        return (
          <Grid
            container
            justify="center"
            alignItems="center"
            className="user-list-container"
          >
            {usersAvailable.map((user, index) => this.renderUsers(user, index))}
          </Grid>
        );
    }
}

const mS = ({ userReducer: { usersAvailable }, teamReducer: { usersToAddTeam } }) => ({
  usersAvailable,
  usersToAddTeam
});

const mD = {
    getUsersAvailable,
    updateList,
}

export default withStyles(styles)(connect(mS,mD)(UserList));