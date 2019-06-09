import React, { Component } from 'react';
import TeamList from '../../Components/TeamList';
import { Grid } from '@material-ui/core';
import UserList from '../../Components/UserList';

class Persons extends Component {
    render() {
        return (
            <Grid container spacing={0} className="persons-container">
                <Grid item xs={6} ><TeamList /></Grid>
                <Grid item xs={6} ><UserList /></Grid>
            </Grid>
        )
    }
}

export default Persons;