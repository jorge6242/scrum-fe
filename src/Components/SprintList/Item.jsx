import React from 'react';
import Grid from "@material-ui/core/Grid";

const Item = ({ sprint, renderStatus, handleEdit }) => {
    return (
        <Grid container spacing={0} className="sprint-container__item-container" onClick={() => handleEdit(sprint)}>
            <Grid item xs={4}>{sprint.name}</Grid>
            <Grid item xs={4}>{renderStatus(sprint.status)}</Grid>
            <Grid item xs={4}>Proyecto {sprint.project.name}</Grid>
        </Grid>
    );
};

export default Item;