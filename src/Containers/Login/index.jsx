import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import "./index.sass";
import LoginForm from "../../Components/LoginForm";
import { login } from "../../Actions/loginActions";
import loginImage from '../../Theme/images/login.jpg';

class Login extends Component {
  state = {
    show: false,
  }
  handleForm = form => {
    const { history } = this.props;
    this.setState({ show: true });
    this.props.login(form).then(res => {
      if (res.status === 200) {
        history.push("/dashboard");
        this.setState({ show: false });
      } else {
        this.setState({ show: false });
      }
    });
  };

  render() {
    const { show } = this.state;
    return (
      <Grid container spacing={0} className="login-container">
        <Grid item xs={12} className="login-container__logo">
         <img src={loginImage} alt="asdasdasd"/>
        </Grid>
        <Grid item xs={12} className="login-container__title">
          Login
        </Grid>
        <Grid item xs={12} className="login-container__form">
          <LoginForm handleForm={this.handleForm} show={show} />
        </Grid>
      </Grid>
    );
  }
}

const mD = {
  login
};

export default withRouter(
  connect(
    null,
    mD
  )(Login)
);
