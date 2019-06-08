import React from 'react';
import Grid from "@material-ui/core/Grid";

const Item = ({ team }) => {
    return (
        <Grid container spacing={0} className="item-container">
            <Grid item xs={12}>{team}</Grid>
        </Grid>
    );
};

export default Item;