import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from "redux-form";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
 formControl: {
   margin: theme.spacing.unit,
   minWidth: '100%',
 },
});


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
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
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

  const renderSelectField = ({
   customSelect,
   input,
   label,
   meta: { touched, error },
   children,
   classes,
   ...custom,
 }) => (
   <FormControl 
     className={classes.formControl}
     error={touched && error}
    >
     <InputLabel htmlFor="age-native-simple" className="title-type">
       Type
     </InputLabel>
     <Select
       className="select-underline"
       {...input}
       {...custom}
       inputProps={{
         name: 'age',
         id: 'age-native-simple',
       }}
     >
       {children}
     </Select>
   </FormControl>
 );

const Sprint = props => {
  const { handleSubmit, pristine, reset, submitting, handleForm, projects, classes } = props;
  return (
    <Grid container spacing={0} className="login-form">
      <form onSubmit={handleSubmit(handleForm)}>
        <Grid item xs={12} className="login-form__field">
          <Field
            name="name"
            type="text"
            component={renderTextField}
            label="Nombre del Sprint"
          />
        </Grid>
        <Grid item xs={12} className="login-form__field">
          <Field
            name="description"
            type="description"
            component={renderTextField}
            label="Descripción del Sprint"
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
              label="Fecha Inicio"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} className="login-form__field">
          <Field
            name="project_id"
            component={renderSelectField}
            label="Project"
            inputProps={{
              name: "project_id",
              id: "project_id",
            }}
            classes={classes}
          >
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </Field>
        </Grid>
        <Grid item xs={12} className="login-form__field">
          <Button
            type="submit"
            disabled={submitting}
            variant="contained"
            color="primary"
          >
            Crear
          </Button>
          <Button
            type="button"
            disabled={pristine || submitting}
            variant="contained"
            color="secondary"
            onClick={reset}
          >
            Limpiar
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

const CustomSprint = reduxForm({
  form: "SprintForm",
  validate,
  enableReinitialize: true
})(Sprint);

export default withStyles(styles)(connect(null)(CustomSprint));
