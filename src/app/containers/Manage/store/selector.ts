import { createSelector } from 'reselect';
import { AppState } from '@app/shared/interface';

const selectProfilesState = (state: AppState) => state.manage;
export const selectProfiles = () => createSelector(selectProfilesState, (state) => state.profiles);
