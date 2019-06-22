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
import Paper from "@material-ui/core/Paper";
import { getMainBacklogSprint } from "../../Actions/backlogActions";
import { getAll } from "../../Actions/projectActions";
import "./index.sass";

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
  componentDidMount() {
    const { projects } = this.props;
    this.props.getAll().then(res => {
      console.log("res ", res);
      if (projects.length > 0) {
      }
    });
  }
  renderBacklog = backlog => {
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {backlog.name}
        </TableCell>
        <TableCell align="right">task</TableCell>
        <TableCell align="right">task</TableCell>
        <TableCell align="right">task</TableCell>
      </TableRow>
    );
  };

  renderProjects = () => (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="age-simple">Age</InputLabel>
      <Select
        value={this.state.age}
        onChange={this.handleChange}
        inputProps={{
          name: "age",
          id: "age-simple"
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
  render() {
    const { classes, mainBacklogSprint, projects } = this.props;
    console.log("projects ", projects);
    return (
      <Grid container spacing={0} className="board-container">
        <Grid item xs={6} className="board-container__title">
          Sprint
        </Grid>
        <Grid item xs={6} className="board-container__projects">
          Sprint
        </Grid>
        <Grid item xs={12} className="board-container__table">
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Backlog</TableCell>
                  <TableCell align="right">To do</TableCell>
                  <TableCell align="right">In Progress</TableCell>
                  <TableCell align="right">Done</TableCell>
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
  projectReducer: { projects }
}) => ({
  mainBacklogSprint,
  projects
});

const mD = {
  getMainBacklogSprint,
  getAll
};

export default connect(
  mS,
  mD
)(withStyles(styles)(Board));
