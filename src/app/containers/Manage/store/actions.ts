import { ManageActionTypes } from './constants';

export const actionAddUser = (payload) => ({ type: ManageActionTypes.ADD_USER, payload });
export const actionGetAllUSers = (payload) => ({ type: ManageActionTypes.GET_ALL_USERS, payload });
export const actionEditUser = (payload) => ({ type: ManageActionTypes.EDIT_USER, payload });
export const actionSetActiveUser = (payload) => ({ type: ManageActionTypes.SET_ACTIVE_USER, payload });
