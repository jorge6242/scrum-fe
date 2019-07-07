import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from "redux-form";
import TextField from '@material-ui/core/TextField';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.description) {
    errors.description = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
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

const renderPickerField = ({
    input,
    label,
    onChange,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      onChange={onChange}
      hintText={label}
      label={label}
      error={touched && error}
      {...input}
      {...custom}
      InputLabelProps={{
          shrink: true,
      }}
    />
  )

const Project = props => {
  const { handleSubmit, pristine, reset, submitting, handleForm, projectFormReducer } = props;
  return (
    <Grid container spacing={0} className="login-form">
      <form onSubmit={handleSubmit(handleForm)}>
        <Grid item xs={12} className="login-form__field">
          <Field
            name="name"
            type="text"
            component={renderTextField}
            label="Nombre del Proyecto"
          />
        </Grid>
        <Grid item xs={12} className="login-form__field">
          <Field
            name="description"
            type="description"
            component={renderTextField}
            label="Descripción"
          />
        </Grid>
        <Grid container spacing={0}>
            <Grid item xs={3} className="login-form__field">
            <Field
                name="start_date"
                type="date"
                component={renderPickerField}
                label="Fecha Inicio"
            />
            </Grid>
            <Grid item xs={6} className="login-form__field">
            <Field
                name="end_date"
                type="date"
                component={renderPickerField}
                label="Fecha Fin"
            />
            </Grid>
        </Grid>
        <Grid item xs={12} className="login-form__field">
          <Button type="submit" disabled={submitting} variant="contained" color="primary" >
            {projectFormReducer.id > 0 ? 'Actualizar' : 'Crear'}
          </Button>
          <Button type="button" disabled={pristine || submitting} variant="contained" color="secondary" onClick={reset} >
            Limpiar
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

const mS = state => ({
  initialValues: state.projectFormReducer,
  projectFormReducer: state.projectFormReducer
});

const CustomProject = reduxForm({
  form: "ProjectForm",
  validate,
  enableReinitialize: true
})(Project);

export default connect(mS)(CustomProject);
