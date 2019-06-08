export const ACTIONS = {
    SET_EDIT: 'team_form/set_edit',
    CLEAR: 'team_form/clear',
  };
  
  export const setEdit = product => ({
    type: ACTIONS.SET_EDIT,
    payload: product
  });
  
  export const clear = () => ({
    type: ACTIONS.CLEAR
  });