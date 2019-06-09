import React, { Component } from 'react';
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getAll } from '../../Actions/backlogActions';
import Item from './Item';
import './index.sass';

class BacklogList extends Component {
    componentWillMount() {
        this.props.getAll();
    }
    render() {
        const { backlogs } = this.props;
        return (
        <Grid container spacing={0} className="backlogs-container">
            <Grid item xs={12} >Backlogs</Grid>
            {
                backlogs.map((backlog, index) => <Item key={index} backlog={backlog.name} />)
            }
        </Grid>
        );
    }
}

const mS = ({ backlogReducer: { backlogs } }) => ({ backlogs });

const mD = {
    getAll,
}

export default connect(mS,mD)(BacklogList);