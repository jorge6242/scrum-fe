import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import "./index.sass";

const validate = values => {
  const errors = {};
  const requiredFields = [
    "name",
    "lastname",
    "email",
    "phone",
    "company",
    "role_id"
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

const renderSelectField = ({
  customSelect,
  input,
  label,
  classes,
  meta: { touched, error },
  children,
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

const UserForm = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    handleForm,
    userFormReducer,
    roles,
    classes
  } = props;
  return (
    <Grid container spacing={0} className="user-form">
      <form onSubmit={handleSubmit(handleForm)}>
        <Grid item xs={12} className="user-form__field">
          <Field
            name="name"
            type="text"
            component={renderTextField}
            label="Nombre"
          />
        </Grid>
        <Grid item xs={12} className="user-form__field">
          <Field
            name="lastname"
            type="text"
            component={renderTextField}
            label="Apellido"
          />
        </Grid>
        <Grid item xs={12} className="user-form__field">
          <Field
            name="email"
            type="text"
            component={renderTextField}
            label="Correo"
          />
        </Grid>
        <Grid item xs={12} className="user-form__field">
          <Field
            name="role_id"
            component={renderSelectField}
            label="Rol"
            inputProps={{
              name: "role_id",
              id: "role_id"
            }}
            classes={classes}
          >
            {roles.map((role, key) => (
              <MenuItem key={key} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Field>
        </Grid>
        <Grid item xs={12} className="user-form__field">
          <Field
            name="phone"
            type="text"
            component={renderTextField}
            label="Telefono"
          />
        </Grid>
        <Grid item xs={12} className="user-form__field">
          <Field
            name="company"
            type="text"
            component={renderTextField}
            label="Empresa"
          />
        </Grid>
        {userFormReducer.id === 0 && (
          <Grid item xs={12} className="user-form__field">
            <Field
              name="password"
              type="password"
              component={renderTextField}
              label="Clave"
            />
          </Grid>
        )}
        <Grid item xs={12} className="user-form__field">
          <Button
            type="submit"
            disabled={submitting}
            variant="contained"
            color="primary"
          >
            {userFormReducer.id > 0 ? "Actualizar" : "Crear"}
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

const mS = state => ({
  initialValues: state.userFormReducer,
  userFormReducer: state.userFormReducer
});

const CustomUserForm = reduxForm({
  form: "UserForm",
  validate,
  enableReinitialize: true
})(UserForm);

export default connect(mS)(CustomUserForm);
