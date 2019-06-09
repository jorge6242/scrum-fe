export const ACTIONS = {
 SET_EDIT: 'sprint_form/set_edit',
 CLEAR: 'sprint_form/clear',
};

export const setEdit = sprint => ({
 type: ACTIONS.SET_EDIT,
 payload: sprint
});

export const clear = () => ({
 type: ACTIONS.CLEAR
});