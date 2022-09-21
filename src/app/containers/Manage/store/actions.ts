import { ManageActionTypes } from './constants';

export const actionAddUser = (payload) => ({ type: ManageActionTypes.ADD_USER, payload });
export const actionGetAllUSers = () => ({ type: ManageActionTypes.GET_ALL_USERS });
export const actionEditUser = (payload) => ({ type: ManageActionTypes.EDIT_USER, payload });
export const actionSetActiveUser = (payload) => ({ type: ManageActionTypes.SET_ACTIVE_USER, payload });
