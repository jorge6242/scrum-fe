export const ACTIONS = {
    SET_EDIT: 'project_form/set_edit',
    CLEAR: 'project_form/clear',
  };
  
  export const setEdit = project => ({
    type: ACTIONS.SET_EDIT,
    payload: project
  });
  
  export const clear = () => ({
    type: ACTIONS.CLEAR
  });