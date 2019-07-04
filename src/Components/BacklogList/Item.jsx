import React from 'react';
import Grid from "@material-ui/core/Grid";

const Item = ({ backlog, handleEdit }) => {
    return (
        <Grid container spacing={0} className="item-container" onClick={() => handleEdit(backlog)}>
            <Grid item xs={12}>{backlog.name}</Grid>
        </Grid>
    );
};

export default Item;