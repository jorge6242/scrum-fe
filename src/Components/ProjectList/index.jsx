import React, { Component } from 'react';
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getAll } from '../../Actions/projectActions';
import Item from './Item';
import './index.sass';

class ProjectList extends Component {
    componentWillMount() {
        this.props.getAll();
    }
    render() {
        const { projects } = this.props;
        return (
        <Grid container spacing={0} className="projects-container">
            <Grid item xs={12} >Proyectos</Grid>
            {
                projects.map((project, index) => <Item key={index} project={project.name} description={project.description} duration='Duration 1' />)
            }
        </Grid>
        );
    }
}

const mS = ({ projectReducer: { projects } }) => ({ projects });

const mD = {
    getAll,
}

export default connect(mS,mD)(ProjectList);