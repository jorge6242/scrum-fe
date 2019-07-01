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
import Select from '@material-ui/core/Select';
import Paper from "@material-ui/core/Paper";
import { getMainBacklogSprint } from "../../Actions/backlogActions";
import { getAll, get } from "../../Actions/projectActions";
import { updateModal } from '../../Actions/modalActions';
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
    value: 0,
  };
  componentWillMount() {
    this.props.getAll();
  }
  renderBacklog = backlog => {
    console.log('backlog ', backlog);
    return (
      <TableRow>
        <TableCell align="left">
          {backlog.name}
        </TableCell>
        <TableCell align="left">
        {backlog.tasks.map(task => task.status === 1 && this.renderTasks(task) )}
        </TableCell>
        <TableCell align="left">
        {backlog.tasks.map(task => task.status === 2 && this.renderTasks(task) )}
        </TableCell>
        <TableCell align="left">
        {backlog.tasks.map(task => task.status === 3 && this.renderTasks(task) )}
        </TableCell>
      </TableRow>
    );
  };

  renderTasks = task => {
    return (
      <div className="task-container" onClick={this.handleTask}>
        {task.name}
      </div>
    )
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
    if (event.target.value > 0) {
      this.props.get(event.target.value);
      this.props.getMainBacklogSprint(event.target.value);
    }
  }

  handleTask = () => {
    this.props.updateModal({
      payload: { status: true, title: "Task", element: <Task /> }
    });
  }

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
          {
            projects.map((project, key) => (
              <MenuItem key={key} value={project.id}>{project.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    )
  };
  render() {
    const { classes, mainBacklogSprint } = this.props;
    return (
      <Grid container spacing={0} className="board-container">
        <Grid item xs={6} className="board-container__title">
          Sprint
        </Grid>
        <Grid item xs={6} className="board-container__projects">
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
  projectReducer: { projects },
  sprintReducer: { sprints },
}) => ({
  mainBacklogSprint,
  projects,
  sprints,
});

const mD = {
  getMainBacklogSprint,
  getAll,
  get,
  updateModal,
};

export default connect(
  mS,
  mD
)(withStyles(styles)(Board));
