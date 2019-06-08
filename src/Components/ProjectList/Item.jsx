import React from 'react';
import Grid from "@material-ui/core/Grid";

const Item = ({ project, description, duration }) => {
    return (
        <Grid container spacing={0} className="item-container">
            <Grid item xs={3}>Nombre del Proyecto</Grid>
            <Grid item xs={9}>{project}</Grid>
            <Grid item xs={3}>Description</Grid>
            <Grid item xs={9}>{description}</Grid>
            <Grid item xs={3}>Tiempo de duracion</Grid>
            <Grid item xs={9}>{duration}</Grid>
        </Grid>
    );
};

export default Item;