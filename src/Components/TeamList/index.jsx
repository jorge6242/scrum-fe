import React, { Component } from 'react';
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getAll } from '../../Actions/teamActions';
import './index.sass';
import Item from './Item';

class TeamList extends Component {
    componentWillMount() {
        this.props.getAll();
    }
    render() {
        const { teams } = this.props;
        return (
        <Grid container spacing={0} className="teams-container">
            {teams.map((team, index) => <Item key={index} team={team.name} />)}
        </Grid>
        );
    }
}

const mS = ({ teamReducer: { teams } }) => ({ teams });

const mD = {
    getAll,
}

export default connect(mS,mD)(TeamList);