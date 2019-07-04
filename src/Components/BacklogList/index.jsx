import React, { Component } from 'react';
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getAll, get } from '../../Actions/backlogActions';
import { updateModal } from '../../Actions/modalActions';
import Item from './Item';
import './index.sass';
import Backlog from '../../Containers/Backlog';

class BacklogList extends Component {
    componentWillMount() {
        this.props.getAll();
    }
    handleEdit = backlog => {
        this.props.get(backlog.id);
        this.props.updateModal({
          payload: { status: true, title: "Backlog", element: <Backlog /> }
        });
      };
    render() {
        const { backlogs } = this.props;
        return (
        <Grid container spacing={0} className="backlogs-container">
            <Grid item xs={12} >Backlogs</Grid>
            {
                backlogs.map((backlog, index) => <Item key={index} backlog={backlog} handleEdit={this.handleEdit} />)
            }
        </Grid>
        );
    }
}

const mS = ({ backlogReducer: { backlogs } }) => ({ backlogs });

const mD = {
    getAll,
    get,
    updateModal,
}

export default connect(mS,mD)(BacklogList);