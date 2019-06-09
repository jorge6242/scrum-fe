import React, { Component } from 'react';
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getAll } from '../../Actions/sprintActions';
import Item from './Item';
import './index.sass';

class BacklogList extends Component {
    componentWillMount() {
        this.props.getAll();
    }
    render() {
        const { sprints } = this.props;
        return (
        <Grid container spacing={0} className="sprint-container">
            <Grid item xs={12} >Sprints</Grid>
            {
                sprints.map((sprint, index) => <Item key={index} sprint={sprint.name} />)
            }
        </Grid>
        );
    }
}

const mS = ({ sprintReducer: { sprints } }) => ({ sprints });

const mD = {
    getAll,
}

export default connect(mS,mD)(BacklogList);