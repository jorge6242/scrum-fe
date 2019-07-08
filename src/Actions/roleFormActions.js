export const ACTIONS = {
  SET_EDIT: 'role_form/set_edit',
  CLEAR: 'role_form/clear',
};

export const setEdit = role => ({
  type: ACTIONS.SET_EDIT,
  payload: role
});

export const clear = () => ({
  type: ACTIONS.CLEAR
});