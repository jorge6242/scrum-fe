import React from "react";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";

const Item = ({ team, handleSelect, users, renderUsers, handleTeamRemove }) => {
  return (
    <Grid
      container
      spacing={0}
      className="item-container"
      onClick={() => handleSelect(team)}
    >
      <Grid container spacing={0}>
        <Grid item xs={10} className={`${users === undefined ? 'custom-title' : ''}`} >
          {team.name}
        </Grid>
        <Grid item xs={2}>
          {users === undefined && (
            <Fab
              size="small"
              color="primary"
              aria-label="Edit"
              onClick={() => handleTeamRemove(team)}
            >
              <DeleteIcon />
            </Fab>
          )}
        </Grid>
      </Grid>

      {users !== undefined &&
        Object.values(users).map((user, index) =>
          renderUsers(user.user, index)
        )}
    </Grid>
  );
};

export default Item;
