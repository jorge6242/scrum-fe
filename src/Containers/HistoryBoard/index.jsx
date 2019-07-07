import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import Grid from "@material-ui/core/Grid";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import {
  getBoardFromSprint,
  customBacklogClear
} from "../../Actions/backlogActions";
import { getAll, get } from "../../Actions/projectActions";
import {
  get as getBacklog,
  checkTaskSprint
} from "../../Actions/backlogActions";
import { updateModal } from "../../Actions/modalActions";
import {
  update,
  setSelectedSprint,
  getSprintsFromProject
} from "../../Actions/sprintActions";
import snackBarStatus from "../../Actions/snackbarActions";
import "./index.sass";
import Task from "../Task";

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

class HistoryBoard extends Component {
  state = {
    projectValue: 0,
    sprintValue: 0,
    showSprints: false
  };
  componentWillMount() {
    this.props.getAll();
  }
  renderBacklog = backlog => {
    return (
      <TableRow>
        <TableCell align="left">{backlog.name}</TableCell>
        <TableCell align="left">
          {backlog.tasks.map(
            task => task.status === 1 && this.renderTasks(task)
          )}
        </TableCell>
        <TableCell align="left">
          {backlog.tasks.map(
            task => task.status === 2 && this.renderTasks(task)
          )}
        </TableCell>
        <TableCell align="left">
          {backlog.tasks.map(
            task => task.status === 3 && this.renderTasks(task)
          )}
        </TableCell>
      </TableRow>
    );
  };

  renderTasks = task => {
    return (
      <div className="task-container" onClick={() => this.handleEditTask(task)}>
        {task.name}
      </div>
    );
  };

  handleChange = event => {
    this.setState({ projectValue: event.target.value });
    this.props.getSprintsFromProject(event.target.value).then(res => {
      if (res.length > 0) {
        this.setState({ showSprints: true });
      } else {
        this.setState({ showSprints: false });
      }
    });
  };

  handleEditTask = task => {
    this.props.getBacklog(task.id);
    this.props.updateModal({
      payload: { status: true, title: "Task", element: <Task /> }
    });
  };

  renderProjects = () => {
    const { classes, projects } = this.props;
    const { projectValue } = this.state;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple" className="title-type">
          Proyecto
        </InputLabel>
        <Select
          value={projectValue}
          onChange={this.handleChange}
          inputProps={{
            name: "age",
            id: "age-simple"
          }}
        >
          <MenuItem value={0}>
            <em>Select Project</em>
          </MenuItem>
          {projects.map((project, key) => (
            <MenuItem key={key} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  renderSprints = () => {
    const { classes, sprintsFromProject } = this.props;
    const { sprintValue } = this.state;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple" className="title-type">
          Sprint
        </InputLabel>
        <Select
          value={sprintValue}
          onChange={this.handleSprint}
          inputProps={{
            name: "age",
            id: "age-simple"
          }}
        >
          <MenuItem value={0}>
            <em>Select Sprint</em>
          </MenuItem>
          {sprintsFromProject.map((sprint, key) => (
            <MenuItem key={key} value={sprint.id}>
              {sprint.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  renderStatus = key => {
    let status = "";
    switch (key) {
      case 1:
        status = "Sin Asignar";
        break;
      case 2:
        status = "En Progreso";
        break;
      case 3:
        status = "Culminado";
        break;
      default:
        break;
    }
    return status;
  };

  handleSprint = event => {
    this.setState({ sprintValue: event.target.value });
    if (event.target.value > 0) {
      this.props.getBoardFromSprint(event.target.value);
    } else {
      this.props.setSelectedSprint({});
      this.props.customBacklogClear({ payload: { boardFromSprint: [] } });
    }
  };

  render() {
    const { classes, boardFromSprint } = this.props;
    const { showSprints } = this.state;
    return (
      <Grid container spacing={0} className="history-board-container">
        <Grid item xs={12} className="history-board-container__projects">
          Historial
        </Grid>
        <Grid item xs={6} className="history-board-container__projects">
          {this.renderProjects()}
        </Grid>
        <Grid item xs={6} className="history-board-container__projects">
          {showSprints && this.renderSprints()}
        </Grid>
        <Grid item xs={12} className="history-board-container__table">
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Backlog</TableCell>
                  <TableCell align="left">To do</TableCell>
                  <TableCell align="left">In Progress</TableCell>
                  <TableCell align="left">Done</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {boardFromSprint.map((backlog, key) =>
                  this.renderBacklog(backlog, key)
                )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mS = ({
  backlogReducer: { boardFromSprint },
  projectReducer: { projects, selectedProject },
  sprintReducer: { sprints, selectedSprint, sprintsFromProject }
}) => ({
  boardFromSprint,
  projects,
  sprints,
  selectedSprint,
  selectedProject,
  sprintsFromProject
});

const mD = {
  getBoardFromSprint,
  getAll,
  updateModal,
  get,
  getBacklog,
  update,
  checkTaskSprint,
  customBacklogClear,
  setSelectedSprint,
  snackBarStatus,
  getSprintsFromProject,
};

export default connect(
  mS,
  mD
)(withStyles(styles)(HistoryBoard));
