import React, { useEffect } from 'react';

import { css } from '@linaria/core';
import { Scrollbars } from 'react-custom-scrollbars';
import 'react-toastify/dist/ReactToastify.css';
import './styles';

import { ROUTES } from '@app/shared/constants';
import { actions as sharedActions, selectors as sharedSelectors } from '@app/shared/store';

import { useNavigate, useRoutes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from '@app/shared/components';
import { ToastContainer } from 'react-toastify';

import { WalletContainer } from './containers/Wallet';
import { AuthContainer, Progress } from './containers/Auth';
import { SettingsContainer } from './containers/Settings';
import { NotificationContainer } from './containers/Notifications';
import { TransactionContainer } from './containers/Transactions';
import { AssetContainer } from './containers/Assets/containers';

const trackStyle = css`
  z-index: 999;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.03);
`;

const routes = [
  {
    path: '/',
    element: <Progress />,
  },
  {
    path: `${ROUTES.ASSETS.BASE}/*`,
    element: <AssetContainer />,
  },
  {
    path: `${ROUTES.AUTH.BASE}/*`,
    element: <AuthContainer />,
  },
  {
    path: `${ROUTES.NOTIFICATIONS.BASE}/*`,
    element: <NotificationContainer />,
  },
  {
    path: `${ROUTES.TRANSACTIONS.BASE}/*`,
    element: <TransactionContainer />,
  },
  {
    path: `${ROUTES.NOTIFICATIONS.BASE}/*`,
    element: <NotificationContainer />,
  },
  {
    path: `${ROUTES.SETTINGS.BASE}/*`,
    element: <SettingsContainer />,
  },
  {
    path: `${ROUTES.WALLET.BASE}/*`,
    element: <WalletContainer />,
  },
];

const App = () => {
  const dispatch = useDispatch();
  const content = useRoutes(routes);
  const navigate = useNavigate();
  const location = useLocation();
  const navigateURL = useSelector(sharedSelectors.selectRouterLink());
  const isLocked = useSelector(sharedSelectors.selectIsLocked());

  useEffect(() => {
    if (navigateURL) {
      if (location.pathname !== navigateURL) {
        navigate(navigateURL);
      }
      dispatch(sharedActions.navigate(''));
    }
  }, [navigateURL, dispatch, navigate, location.pathname]);

  useEffect(() => {
    if (isLocked && !location.pathname.includes('auth')) {
      navigate(ROUTES.AUTH.LOGIN);
    }
  }, [isLocked, navigate, location.pathname]);

  return (
    <ErrorBoundary>
      <Scrollbars
        style={{ width: 375, height: 600 }}
        renderThumbVertical={(props) => <div {...props} className={trackStyle} />}
      >
        {content}
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={null}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          icon={false}
          closeButton={false}
          toastStyle={{
            textAlign: 'center',
            background: 'linear-gradient(0deg, rgba(63, 208, 90, 0.05), rgba(63, 208, 90, 0.05)), #FFFFFF',
            color: '#3FD05A',
            height: '48px !important',
            width: '327px',
            margin: '0 auto 106px',
            border: '1px solid #3FD05A',
            boxSizing: 'border-box',
            borderRadius: '8px',
            boxShadow: 'none',
            fontWeight: '600',
          }}
        />
      </Scrollbars>
    </ErrorBoundary>
  );
};

export default App;
