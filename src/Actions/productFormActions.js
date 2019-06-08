export const ACTIONS = {
  SET_EDIT: 'product_form/set_edit',
  CLEAR: 'product_form/clear',
};

export const setEdit = product => ({
  type: ACTIONS.SET_EDIT,
  payload: product
});

export const clear = () => ({
  type: ACTIONS.CLEAR
});