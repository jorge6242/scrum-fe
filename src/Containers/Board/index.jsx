import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import Grid from "@material-ui/core/Grid";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getMainBacklog } from "../../Actions/backlogActions";

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
  componentWillMount() {
    this.props.getMainBacklog();
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

  render() {
    const { classes, mainBacklogs } = this.props;
    return (
      <Grid container spacing={0} className="board-container">
        <Grid item xs={12} className="board-container__header">
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
            {mainBacklogs.map((backlog, key) =>
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

const mS = ({ backlogReducer: { mainBacklogs } }) => ({
  mainBacklogs
});

const mD = {
  getMainBacklog
};

export default connect(
  mS,
  mD
)(withStyles(styles)(Board));
