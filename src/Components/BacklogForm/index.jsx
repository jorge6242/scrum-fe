import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import "./index.sass";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "100%"
  }
});

const validate = values => {
  const errors = {};
  const requiredFields = [
    "name",
    "description",
    "estimate_days",
    "type",
    "project_id",
    "sprint_id"
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
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
      shrink: true
    }}
  />
);

const renderSelectField = ({
  customSelect,
  input,
  label,
  meta: { touched, error },
  children,
  classes,
  ...custom
}) => (
  <FormControl className={classes.formControl} error={touched && error}>
    <InputLabel htmlFor="age-native-simple" className="title-type">
      {label}
    </InputLabel>
    <Select
      className="select-underline"
      {...input}
      {...custom}
      inputProps={{
        name: "age",
        id: "age-native-simple"
      }}
    >
      {children}
    </Select>
  </FormControl>
);

const Backlog = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    handleForm,
    classes,
    projects,
    sprints,
    users,
    mainBacklogs,
    show
  } = props;
  return (
    <Grid container spacing={0} className="backlog-form">
      <form onSubmit={handleSubmit(handleForm)}>
        <Grid item xs={12} className="backlog-form__field">
          <Field
            name="name"
            type="text"
            component={renderTextField}
            label="Nombre del Backlog"
          />
        </Grid>
        <Grid item xs={12} className="backlog-form__field">
          <Field
            name="description"
            type="text"
            component={renderTextField}
            label="Descripción del Backlog"
          />
        </Grid>
        <Grid item xs={12} className="backlog-form__field">
          <Field
            name="estimate_days"
            type="number"
            component={renderTextField}
            label="Dias de estimacion"
          />
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={3} className="backlog-form__field">
            <Field
              name="start_date"
              type="date"
              component={renderPickerField}
              label="Fecha Inicio"
            />
          </Grid>
          <Grid item xs={6} className="backlog-form__field">
            <Field
              name="end_date"
              type="date"
              component={renderPickerField}
              label="Fecha Inicio"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} className="backlog-form__field">
          <Field
            name="type"
            component={renderSelectField}
            label="Tipo"
            inputProps={{
              name: "type",
              id: "type"
            }}
            classes={classes}
          >
            <MenuItem value={1}>Epica</MenuItem>
            <MenuItem value={2}>Caracteristica</MenuItem>
          </Field>
        </Grid>
        {show && (
          <Grid item xs={12} className="backlog-form__field">
            <Field
              name="assoc_backlog"
              component={renderSelectField}
              label="Epica"
              inputProps={{
                name: "assoc_backlog",
                id: "assoc_backlog"
              }}
              classes={classes}
            >
              {mainBacklogs.map((backlog, key) => (
                <MenuItem key={key} value={backlog.id}>
                  {backlog.name}
                </MenuItem>
              ))}
            </Field>
          </Grid>
        )}
        <Grid item xs={12} className="backlog-form__field">
          <Field
            name="project_id"
            component={renderSelectField}
            label="Project"
            inputProps={{
              name: "project_id",
              id: "project_id"
            }}
            classes={classes}
          >
            {projects.map((project, key) => (
              <MenuItem key={key} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Field>
        </Grid>
        <Grid item xs={12} className="backlog-form__field">
          <Field
            name="sprint_id"
            component={renderSelectField}
            label="Sprint"
            inputProps={{
              name: "sprint_id",
              id: "sprint_id"
            }}
            classes={classes}
          >
            {sprints.map((sprint, key) => (
              <MenuItem key={key} value={sprint.id}>
                {sprint.name}
              </MenuItem>
            ))}
          </Field>
        </Grid>
        <Grid item xs={12} className="backlog-form__field">
          <Field
            name="user_id"
            component={renderSelectField}
            label="User"
            inputProps={{
              name: "user_id",
              id: "user_id"
            }}
            classes={classes}
          >
            {users.map((user, key) => (
              <MenuItem key={key} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Field>
        </Grid>
        <Grid item xs={12} className="backlog-form__field">
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

const CustomBacklog = reduxForm({
  form: "BacklogForm",
  validate,
  enableReinitialize: true
})(Backlog);

export default withStyles(styles)(connect(null)(CustomBacklog));
