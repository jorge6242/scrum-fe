import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Modal from "../../Components/Modal";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { updateModal } from "../../Actions/modalActions";
import { getAll, get } from "../../Actions/productActions";
import { logout } from "../../Actions/loginActions";
import "./index.sass";
import ProjectList from "../../Components/ProjectList";
import Project from "../../Containers/Project";
import Persons from "../Persons";
import Team from "../Team";
import User from "../User";
import SprintList from "../../Components/SprintList";
import Sprint from "../Sprint";
import Backlog from "../Backlog";
import BacklogList from "../../Components/BacklogList";
import Board from "../Board";
import { getAll as getRoles } from "../../Actions/roleActions";
import { getUserProfile } from "../../Actions/userActions";
import HistoryBoard from "../HistoryBoard";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
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
    historyBoard: false
  };

  componentWillMount() {
    this.props.getRoles();
    this.props.getUserProfile();
  }

  handleClick = () => {
    const { role } = this.props;
    const { value } = this.state;
    let element = <div />;
    let title = "";
    switch (value) {
      case 0:
        if (role.name === "Desarrollo" || role.name === "QA") {
          element = <Backlog />;
          title = "Backlog";
        }
        break;
      case 1:
        if (role.name === "Proyecto") {
          element = <Project />;
          title = "Proyecto";
        }
        break;
      case 2:
        element = <Sprint />;
        title = "Sprint";
        break;
      case 3:
        element = <Backlog />;
        title = "Backlog";
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
  };

  handleTeam = () => {
    this.props.updateModal({
      payload: { status: true, title: "Team", element: <Team /> }
    });
  };

  handleUser = () => {
    this.props.updateModal({
      payload: { status: true, title: "Person", element: <User /> }
    });
  };

  renderSimpleButton = () => (
    <Fab
      color="primary"
      aria-label="Add"
      className={this.props.classes.fab}
      onClick={this.handleClick}
    >
      <AddIcon />
    </Fab>
  );

  renderButtons = () => {
    const { role } = this.props;
    const { value } = this.state;
    let button = <div />;
    switch (value) {
      case 0:
        if (role.name === "Desarrollo" || role.name === "QA") {
          button = this.renderSimpleButton();
        } else {
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
        }
        break;
      case 1:
        button = role.name === "Proyecto" && this.renderSimpleButton();
        break;
      case 2:
        button = this.renderSimpleButton();
        break;
      case 3:
        button = this.renderSimpleButton();
        break;
      default:
        break;
    }
    return button;
  };

  handleBoard = event => {
    const { historyBoard } = this.state;
    if (historyBoard) {
      this.setState({ historyBoard: false });
    } else {
      this.setState({ historyBoard: true });
    }
  };

  renderTabRoles = key => {
    let render = <div />;
    switch (key) {
      case "Proyecto":
        return (render = (
          <React.Fragment>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Personas" />
              <Tab label="Proyecto" />
              <Tab label="Sprint" />
              <Tab label="Backlog" />
              <Tab label="Tablero" />
            </Tabs>
          </React.Fragment>
        ));
      case "Desarrollo":
      case "QA":
        return (render = (
          <React.Fragment>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Backlog" />
              <Tab label="Tablero" />
            </Tabs>
          </React.Fragment>
        ));
      default:
        return render;
    }
  };

  renderSwipeableViewsRoles = key => {
    const { theme } = this.props;
    const { historyBoard } = this.state;
    let render = <div />;
    switch (key) {
      case "Proyecto":
        return (render = (
          <React.Fragment>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabContainer dir={theme.direction}>
                <Persons />
              </TabContainer>
              <TabContainer dir={theme.direction}>
                <ProjectList />
              </TabContainer>
              <TabContainer dir={theme.direction}>
                <SprintList />
              </TabContainer>
              <TabContainer dir={theme.direction}>
                <BacklogList />
              </TabContainer>
              <TabContainer dir={theme.direction}>
                {historyBoard ? <HistoryBoard /> : <Board />}
              </TabContainer>
            </SwipeableViews>
          </React.Fragment>
        ));
      case "Desarrollo":
      case "QA":
        return (render = (
          <React.Fragment>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabContainer dir={theme.direction}>
                <BacklogList />
              </TabContainer>
              <TabContainer dir={theme.direction}>
                {historyBoard ? <HistoryBoard /> : <Board />}
              </TabContainer>
            </SwipeableViews>
          </React.Fragment>
        ));
      default:
        return render;
    }
  };

  renderTabs = () => {
    const { role } = this.props;
    return (
      <React.Fragment>
        <AppBar position="static" color="default">
          {this.renderTabRoles(role.name)}
        </AppBar>
        {this.renderSwipeableViewsRoles(role.name)}
      </React.Fragment>
    );
  };

  renderSwitch = () => {
    const { historyBoard, value } = this.state;
    const { role } = this.props;
    if (role.name === "Proyecto" && value === 4) {
      return (
        <Grid item xs={12} className="dashboard__switch">
          <FormControlLabel
            control={
              <Switch
                checked={historyBoard}
                onChange={this.handleBoard}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="Mostrar Historial"
          />
        </Grid>
      );
    }
    if ((role.name === "Desarrollo" || role.name === "QA") && value === 1) {
      return (
        <Grid item xs={12} className="dashboard__switch">
          <FormControlLabel
            control={
              <Switch
                checked={historyBoard}
                onChange={this.handleBoard}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="Mostrar Historial"
          />
        </Grid>
      );
    }
  };

  render() {
    const { classes, role } = this.props;
    return (
      role !== undefined && (
        <Grid
          container
          spacing={0}
          id="dashboard"
          className={`${role.name !== "Proyecto" ? "custom-display" : ""}`}
        >
          {this.renderTabs()}
          <Grid
            item
            xs={12}
            className="dashboard__logout"
            onClick={this.handleLogout}
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Logout
            </Button>
          </Grid>
          {this.renderSwitch()}
          <Grid item xs={12} className="dashboard__create">
            {this.renderButtons()}
          </Grid>
          <Modal />
        </Grid>
      )
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mS = ({
  productReducer: { products },
  userReducer: {
    userProfile: { role }
  }
}) => ({
  products,
  role
});

const mD = {
  updateModal,
  getAll,
  get,
  logout,
  getRoles,
  getUserProfile
};

export default connect(
  mS,
  mD
)(withStyles(styles, { withTheme: true })(Dashboard));
