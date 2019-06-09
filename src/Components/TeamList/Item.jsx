import React from 'react';
import Grid from "@material-ui/core/Grid";

const Item = ({ team, handleSelect, users, renderUsers }) => {
    console.log('users ', users);
    return (
        <Grid container spacing={0} className="item-container" onClick={() => handleSelect(team)}>
            <Grid item xs={12}>{team.name}</Grid>
            { users !== undefined && Object.values(users).map((user,index) => renderUsers(user.user,index)) }
        </Grid>
    );
};

export default Item;