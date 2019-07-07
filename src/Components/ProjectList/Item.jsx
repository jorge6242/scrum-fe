import React from 'react';
import Grid from "@material-ui/core/Grid";

const Item = ({ project, handleEdit, getEstimation }) => {
    return (
        <Grid container spacing={0} className="projects-container__item-container" onClick={() => handleEdit(project)}>
            <Grid item xs={3}>Nombre del Proyecto</Grid>
            <Grid item xs={9}>{project.name}</Grid>
            <Grid item xs={3}>Descripción</Grid>
            <Grid item xs={9}>{project.description}</Grid>
            <Grid item xs={3}>Tiempo de duración</Grid>
            <Grid item xs={9}>{getEstimation(project.start_date, project.end_date)} Dias</Grid>
        </Grid>
    );
};

export default Item;