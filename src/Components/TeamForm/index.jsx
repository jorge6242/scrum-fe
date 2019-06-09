import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from "redux-form";
import TextField from '@material-ui/core/TextField';
import './index.sass';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  return errors;
};

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    label={label}
    error={touched && error}
    {...input}
    {...custom}
  />
)

const TeamForm = props => {
  const { handleSubmit, pristine, reset, submitting, handleForm } = props;
  return (
    <Grid container spacing={0} className="team-form">
      <form onSubmit={handleSubmit(handleForm)}>
        <Grid item xs={12} className="team-form__field">
          <Field
            name="name"
            type="text"
            component={renderTextField}
            label="Nombre del Equipo"
          />
        </Grid>
        <Grid item xs={12} className="team-form__field">
          <Button type="submit" disabled={submitting} variant="contained" color="primary" >
            Crear
          </Button>
          <Button type="button" disabled={pristine || submitting} variant="contained" color="secondary" onClick={reset} >
            Limpiar
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

const CustomTeamForm = reduxForm({
  form: "TeamForm",
  validate,
  enableReinitialize: true
})(TeamForm);

export default connect(null)(CustomTeamForm);
