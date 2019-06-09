import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from '@material-ui/core/Button';
import Modal from "../../Components/Modal";
import { updateModal } from "../../Actions/modalActions";
import { getAll, get } from "../../Actions/productActions";
import { logout } from '../../Actions/loginActions';
import "./index.sass";
import ProjectList from "../../Components/ProjectList";
import Project from "../../Containers/Project";
import Persons from "../Persons";
import Team from "../Team";
import User from "../User";
import SprintList from "../../Components/SprintList";
import Sprint from "../Sprint";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class Dashboard extends Component {
  state = {
    value: 0,
  };

  handleClick = () => {
    const { value } = this.state;
    let element = <div />;
    let title = '';
    switch (value) {
      case 0:
        element = <Project />;
        title ='Projecto';
        break;
      case 3:
        element = <Sprint />;
        title ='Sprint';
        break;
      default:
        break;
    }
    this.props.updateModal({ payload: { status: true, title, element } });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  
  componentDidMount() {
    this.props.getAll();
  }

  handleLogout = () => {
    this.props.logout();
  }

  handleTeam = () => {
    this.props.updateModal({ payload: { status: true, title: 'Team', element: <Team /> } });
  }

  handleUser = () => {
    this.props.updateModal({ payload: { status: true, title: 'Person', element: <User /> } });
  }

  renderButtons = () => {
    const { classes } = this.props;
    const { value } = this.state;
    let button = <div />
    switch (value) {
      case 0:
        button = (
          <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.handleClick}>
            <AddIcon />
          </Fab>
        );
        break;
      case 1:
        button = (
          <React.Fragment>
            <Button
              variant="contained"
              color="primary"
              className="dashboard__add-team-button"
              onClick={this.handleTeam}
            >
              Add Team
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleUser}
            >
              Add User
            </Button>
          </React.Fragment>
        );
        break;
      case 3:
        button = (
          <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.handleClick}>
            <AddIcon />
          </Fab>
        );
        break;
      default:
        break;
    }
    return button;
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <Grid container spacing={0} id="dashboard">
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Proyecto" />
            <Tab label="Personas" />
            <Tab label="Backlog" />
            <Tab label="Sprint" />
            <Tab label="Tablero" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}><ProjectList /></TabContainer>
          <TabContainer dir={theme.direction}><Persons /></TabContainer>
          <TabContainer dir={theme.direction}>Backlog</TabContainer>
          <TabContainer dir={theme.direction}><SprintList /></TabContainer>
          <TabContainer dir={theme.direction}>Tablero</TabContainer>
        </SwipeableViews>
        <Grid 
          item
          xs={12}
          className="dashboard__logout"
          onClick={this.handleLogout}
        >
        <Button variant="contained" color="primary" className={classes.button}>
          Logout
        </Button>
        </Grid>
        <Grid
          item
          xs={12}
          className="dashboard__create"
        >
          {this.renderButtons()}
        </Grid>
        <Modal />
      </Grid>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mS = ({ productReducer: { products } }) => ({
  products
});

const mD = {
  updateModal,
  getAll,
  get,
  logout,
};

export default connect(
  mS,
  mD
)(withStyles(styles, { withTheme: true })(Dashboard));
