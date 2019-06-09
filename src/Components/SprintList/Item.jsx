import React from 'react';
import Grid from "@material-ui/core/Grid";

const Item = ({ sprint }) => {
    return (
        <Grid container spacing={0} className="item-container">
            <Grid item xs={3}>Sprint</Grid>
            <Grid item xs={9}>{sprint}</Grid>
        </Grid>
    );
};

export default Item;