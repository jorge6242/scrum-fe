import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
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

const renderSelectField = ({
  customSelect,
  input,
  label,
  meta: { touched, error },
  children,
  classes,
  ...custom
}) => (
  <FormControl error={touched && error}>
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

const TaskForm = props => {
  const { handleSubmit, submitting, handleForm } = props;
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
            name="estimate_days"
            type="text"
            component={renderTextField}
            label="Estimacion"
          />
        </Grid>
        <Grid item xs={12} className="team-form__field">
          <Field
            name="status"
            type="text"
            component={renderSelectField}
            label="Estatus"
          >
            <MenuItem value={1}>To do</MenuItem>
            <MenuItem value={2}>In Progress</MenuItem>
            <MenuItem value={3}>Done</MenuItem>
          </Field>
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

const mS = state => ({
  initialValues: state.backlogFormReducer,
  backlogFormReducer: state.backlogFormReducer,
});

const CustomTaskForm = reduxForm({
  form: "TaskForm",
  validate,
  enableReinitialize: true
})(TaskForm);

export default connect(mS)(CustomTaskForm);
