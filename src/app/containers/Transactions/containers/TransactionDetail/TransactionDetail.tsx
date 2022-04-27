import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@linaria/react';
import { useParams } from 'react-router-dom';
import { Window } from '@app/shared/components';

import { PaymentProofInformation, GeneralTransactionInformation } from '@app/containers/Transactions';
import { useDispatch, useSelector } from 'react-redux';
import { loadTransactionStatus, setPaymentProof } from '@app/containers/Transactions/store/actions';
import { selectPaymentProof, selectTransactionDetail } from '@app/containers/Transactions/store/selectors';
import { selectAssets } from '@app/containers/Wallet/store/selectors';
import { selectIsBalanceHidden } from '@app/shared/store/selectors';
import { toast } from 'react-toastify';
import { copyToClipboard } from '@core/utils';
import { TabItem, TabsMenu } from '@app/shared/components/TabsMenu';

const TransactionDetailWrapper = styled.div`
  padding: 30px 24px;
  margin-top: 40px;
`;

const TransactionDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('general');
  const transactionDetail = useSelector(selectTransactionDetail());
  const paymentProof = useSelector(selectPaymentProof());
  const isBalanceHidden = useSelector(selectIsBalanceHidden());
  //  const rate = useSelector(selectRate());
  const assets = useSelector(selectAssets());

  useEffect(() => {
    dispatch(loadTransactionStatus.request(params.id));
    return () => {
      dispatch(loadTransactionStatus.success(null));
      dispatch(setPaymentProof(null));
    };
  }, [dispatch, params.id]);

  const handleButton = (e: { keyCode: number }) => {
    if (e.keyCode === 9) {
      if (activeTab === 'general' && paymentProof) {
        setActiveTab('payment-proof');
      } else {
        setActiveTab('general');
      }
    }
  };

  const copy = useCallback((value, tM) => {
    toast(tM);
    copyToClipboard(value);
  }, []);

  return (
    <Window title="Transaction details">
      {transactionDetail && (transactionDetail.status_string === 'sent' || 'sent offline') ? (
        <TabsMenu>
          <TabItem
            active={activeTab === 'general'}
            onClick={() => setActiveTab('general')}
            onKeyDown={handleButton}
            tabIndex={0}
          >
            General
          </TabItem>
          {paymentProof && (
          <TabItem
            active={activeTab === 'payment-proof'}
            onClick={() => setActiveTab('payment-proof')}
            onKeyDown={handleButton}
            tabIndex={-1}
          >
            Payment proof
          </TabItem>
          )}
        </TabsMenu>
      ) : (
        <GeneralTransactionInformation
          transactionDetail={transactionDetail}
          assets={assets}
          isBalanceHidden={isBalanceHidden}
          copy={copy}
        />
      )}
      <TransactionDetailWrapper>
        {activeTab === 'general' && transactionDetail && (
          <GeneralTransactionInformation
            transactionDetail={transactionDetail}
            assets={assets}
            isBalanceHidden={isBalanceHidden}
            copy={copy}
          />
        )}
        {activeTab === 'payment-proof' && (
          <PaymentProofInformation
            paymentProof={paymentProof}
            transactionDetail={transactionDetail}
            isBalanceHidden={isBalanceHidden}
            copy={copy}
          />
        )}
      </TransactionDetailWrapper>
    </Window>
  );
};

export default TransactionDetail;
