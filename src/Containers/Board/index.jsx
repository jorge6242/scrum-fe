import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import Grid from "@material-ui/core/Grid";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import {
  getMainBacklogSprint,
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
  getAll as getSprints
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

class Board extends Component {
  state = {
    value: 0
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
    this.setState({ value: event.target.value });
    if (event.target.value > 0) {
      this.props.get(event.target.value);
      this.props.getMainBacklogSprint(event.target.value).then(res => {
        if (res.length === 0) {
          this.props.snackBarStatus({
            payload: {
              title: "No hay Sprint en proceso para este proyecto",
              type: "error",
              enable: true
            }
          });
        }
      });
    } else {
      this.props.setSelectedSprint({});
      this.props.customBacklogClear({ payload: { mainBacklogSprint: [] } });
    }
  };

  handleEditTask = task => {
    this.props.getBacklog(task.id);
    this.props.updateModal({
      payload: { status: true, title: "Task", element: <Task /> }
    });
  };

  renderProjects = () => {
    const { classes, projects } = this.props;
    const { value } = this.state;
    return (
      <FormControl className={classes.formControl}>
        <Select
          value={value}
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

  handleSprint = () => {
    const { selectedSprint, selectedProject } = this.props;
    this.props
      .checkTaskSprint(selectedProject.id, selectedSprint.id)
      .then(res => {
        if (res) {
          selectedSprint.status = 3;
          this.props.update(selectedSprint).then(response => {
            this.setState({ value: 0 });
            this.props.setSelectedSprint({});
            this.props.customBacklogClear({
              payload: { mainBacklogSprint: [], boardFromSprint: [] }
            });
            this.props.snackBarStatus({
              payload: {
                title: "El sprint ha sido culminado con exito",
                type: "success",
                enable: true
              }
            });
            this.props.getSprints();
          });
        } else {
          this.props.snackBarStatus({
            payload: {
              title: "Las tareas del sprint necesitan estar en Done",
              type: "error",
              enable: true
            }
          });
        }
      });
  };

  render() {
    const { classes, mainBacklogSprint, selectedSprint } = this.props;
    return (
      <Grid container spacing={0} className="board-container">
        {"name" in selectedSprint && (
          <Grid
            container
            spacing={0}
            className="board-container__sprint-container"
          >
            <Grid item xs={4} className="board-container__sprint-title">
              {selectedSprint.name}
            </Grid>
            <Grid item xs={4} className="board-container__sprint-button">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.handleSprint()}
              >
                Completar Sprint
              </Button>
            </Grid>
            <Grid item xs={4} className="board-container__sprint-status">
              {this.renderStatus(selectedSprint.status)}
            </Grid>
          </Grid>
        )}
        <Grid item xs={12} className="board-container__projects">
          {this.renderProjects()}
        </Grid>
        <Grid item xs={12} className="board-container__table">
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
                {mainBacklogSprint.map((backlog, key) =>
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

Board.propTypes = {};

const mS = ({
  backlogReducer: { mainBacklogSprint },
  projectReducer: { projects, selectedProject },
  sprintReducer: { sprints, selectedSprint }
}) => ({
  mainBacklogSprint,
  projects,
  sprints,
  selectedSprint,
  selectedProject
});

const mD = {
  getMainBacklogSprint,
  getAll,
  updateModal,
  get,
  getBacklog,
  update,
  checkTaskSprint,
  customBacklogClear,
  setSelectedSprint,
  snackBarStatus,
  getSprints
};

export default connect(
  mS,
  mD
)(withStyles(styles)(Board));
