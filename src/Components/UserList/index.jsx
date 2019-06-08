import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { getAll } from '../../Actions/userActions';
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
  };
  

class UserList extends Component {
    componentWillMount() {
        this.props.getAll();
    }
    render() {
        const { users, classes } = this.props;
        return (
          <Grid
            container
            justify="center"
            alignItems="center"
            className="user-list-container"
          >
            {users.map(user => (
              <div className="user-container">
                <Avatar className={classes.avatar}><FaceIcon className={classes.icon} /></Avatar>
                <div className="title">{user.name}</div>
              </div>
            ))}
          </Grid>
        );
    }
}

const mS = ({ userReducer: { users } }) => ({ users });

const mD = {
    getAll,
}

export default withStyles(styles)(connect(mS,mD)(UserList));