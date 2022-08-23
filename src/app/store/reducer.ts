import { AnyAction, combineReducers } from 'redux';
import { AppState } from '@app/shared/interface';
import { SharedReducer } from '@app/shared/store/reducer';
import { AuthReducer } from '@app/containers/Auth/store/reducer';
import { SettingsReducer } from '@app/containers/Settings/store/reducer';
import { WalletReducer } from '@app/containers/Wallet/store/reducer';
import { TransactionsReducer } from '@app/containers/Transactions/store/reducer';
import { ManageReducer } from '@app/containers/Manage/store/reducer';

export default () => {
  const appReducer = combineReducers({
    shared: SharedReducer,
    auth: AuthReducer,
    settings: SettingsReducer,
    wallet: WalletReducer,
    transactions: TransactionsReducer,
    manage: ManageReducer,
  });

  return (state: AppState | undefined, action: AnyAction) => appReducer(state, action);
};
