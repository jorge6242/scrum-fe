export const ACTIONS = {
    SET_EDIT: 'team_form/set_edit',
    CLEAR: 'team_form/clear',
  };
  
  export const setEdit = team => ({
    type: ACTIONS.SET_EDIT,
    payload: team
  });
  
  export const clear = () => ({
    type: ACTIONS.CLEAR
  });