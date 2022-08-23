import { Profile } from '@app/core/types';
import { ManageActionTypes } from './constants';

const initialState: Profile = {
  profiles: [
    {
      id: 0,
      name: 'User 1',
      active: true,
      avatar: 0,
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ManageActionTypes.ADD_USER: {
      const updateProfiles = [...state.profiles, action.payload];
      window.localStorage.setItem('default', JSON.stringify({ ...state, profiles: updateProfiles }));
      return { ...state, profiles: updateProfiles };
    }
    case ManageActionTypes.GET_ALL_USERS: {
      // eslint-disable-next-line max-len
      if (
        localStorage.length === 0
        || JSON.parse(localStorage.getItem('default')) === null
        || JSON.parse(localStorage.getItem('default')) === undefined
      ) return window.localStorage.setItem('default', JSON.stringify(state));
      return JSON.parse(window.localStorage.getItem('default'));
    }
    case ManageActionTypes.EDIT_USER: {
      const updateProfiles = action.payload;
      window.localStorage.setItem('default', JSON.stringify({ profiles: updateProfiles }));
      return state;
    }
    case ManageActionTypes.SET_ACTIVE_USER: {
      const updateProfiles = action.payload;
      window.localStorage.setItem('default', JSON.stringify({ profiles: updateProfiles }));
      return { profiles: updateProfiles };
    }
    default:
      return state;
  }
};

export { reducer as ManageReducer };
