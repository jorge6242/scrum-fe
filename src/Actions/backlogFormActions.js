export const ACTIONS = {
 SET_EDIT: 'backlog_form/set_edit',
 CLEAR: 'backlog_form/clear',
};

export const setEdit = backlog => ({
 type: ACTIONS.SET_EDIT,
 payload: backlog
});

export const clear = () => ({
 type: ACTIONS.CLEAR
});