import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import MainLayout from "../Hoc/MainLayout";
import Login from "../Containers/Login";
import Dashboard from "../Containers/Dashboard";
import SnackBar from '../Components/SnackBar';
import { setupInterceptors } from '../Actions/authActions';

class Routes extends Component {
  componentWillMount() {
    this.props.setupInterceptors();
  }
  componentWillUpdate() {
    this.props.setupInterceptors();
  }
  render() {
    return (
      <Router>
        <MainLayout>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/dashboard" exact component={Dashboard} />
          </Switch>
          <SnackBar />
        </MainLayout>
      </Router>
    );
  }
}

const mD = {
  setupInterceptors,
};

export default connect(null,mD)(Routes);
