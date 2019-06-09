import React from 'react';
import Grid from "@material-ui/core/Grid";

const Item = ({ project }) => {
    return (
        <Grid container spacing={0} className="item-container">
            <Grid item xs={3}>Backlog</Grid>
            <Grid item xs={9}>{project}</Grid>
        </Grid>
    );
};

export default Item;