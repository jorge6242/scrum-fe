import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import "./index.sass";

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
);

const TaskForm = props => {
  const { handleSubmit, pristine, reset, submitting, handleForm } = props;
  return (
    <Grid container spacing={0} className="team-form">
      <form onSubmit={handleSubmit(handleForm)}>
        <Grid item xs={12} className="team-form__field">
          <Field
            name="name"
            type="text"
            component={renderTextField}
            label="Nombre"
          />
        </Grid>
        <Grid item xs={12} className="team-form__field">
          <Field
            name="description"
            type="text"
            component={renderTextField}
            label="Description"
          />
        </Grid>
        <Grid item xs={12} className="team-form__field">
          <Field
            name="estimation"
            type="text"
            component={renderTextField}
            label="Estimacion"
          />
        </Grid>
        <Grid item xs={12} className="team-form__field">
          <Button
            type="submit"
            disabled={submitting}
            variant="contained"
            color="primary"
          >
            Actualizar
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

const CustomTaskForm = reduxForm({
  form: "TaskForm",
  validate,
  enableReinitialize: true
})(TaskForm);

export default connect(null)(CustomTaskForm);
