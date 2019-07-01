import React from 'react';
import Grid from "@material-ui/core/Grid";

const Item = ({ sprint, renderStatus }) => {
    return (
        <Grid container spacing={0} className="item-container">
            <Grid item xs={4}>{sprint.name}</Grid>
            <Grid item xs={4}>{renderStatus(sprint.status)}</Grid>
            <Grid item xs={4}>Proyecto {sprint.project.name}</Grid>
        </Grid>
    );
};

export default Item;