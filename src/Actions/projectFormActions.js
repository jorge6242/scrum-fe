export const ACTIONS = {
    SET_EDIT: 'project_form/set_edit',
    CLEAR: 'project_form/clear',
  };
  
  export const setEdit = product => ({
    type: ACTIONS.SET_EDIT,
    payload: product
  });
  
  export const clear = () => ({
    type: ACTIONS.CLEAR
  });