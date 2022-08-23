import React from 'react';
import { useRoutes } from 'react-router-dom';

import { ROUTES_PATH } from '@app/shared/constants';
import {
  SendForm, Receive, Utxo, Wallet,
} from '..';
import Activity from '../Activity';
import Manage from '../../../Manage';

const routes = [
  {
    path: ROUTES_PATH.WALLET.BASE,
    element: <Activity />,
    exact: true,
  },
  {
    path: ROUTES_PATH.WALLET.PROFILE,
    element: <Wallet />,
  },
  {
    path: ROUTES_PATH.WALLET.SEND,
    element: <SendForm />,
  },
  {
    path: ROUTES_PATH.WALLET.RECEIVE,
    element: <Receive />,
  },
  {
    path: ROUTES_PATH.WALLET.UTXO,
    element: <Utxo />,
  },
  {
    path: ROUTES_PATH.WALLET.MANAGE,
    element: <Manage />,
  },
];

const WalletContainer = () => {
  const content = useRoutes(routes);

  return <>{content}</>;
};

export default WalletContainer;
