/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { styled } from '@linaria/react';

import {
  Window, Section, Button, Input, Toggle, Popup,
} from '@app/shared/components';

import { CopySmallIcon, DoneIcon, IconQrCode } from '@app/shared/icons';

import AmountInput from '@app/shared/components/AmountInput';

import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@app/shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddress, selectReceiveAmount } from '@app/containers/Wallet/store/selectors';
import { generateAddress, resetReceive, setReceiveAmount } from '@app/containers/Wallet/store/actions';
import { compact, copyToClipboard } from '@core/utils';
import { toast } from 'react-toastify';

const AddressStyled = styled.div`
  line-height: 24px;
  text-align: center;
`;

const TipStyled = styled.div`
  line-height: 1.14;
  margin-top: 10px;
  font-size: 14px;
  font-style: italic;
  color: var(--color-gray);
`;

const WarningStyled = styled(TipStyled)`
  margin-bottom: 20px;
  text-align: center;
`;

const RowStyled = styled.div`
  display: flex;
`;

const LabelStyled = styled.label`
  flex-grow: 1;
`;

const QrCodeWrapper = styled.div`
  > .qr-cd {
    background: white;
    border-radius: 10px;
    padding: 5px;
    width: 230px;
    margin: 0 auto 30px;
  }
  > .text {
    opacity: 0.5;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: italic;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: black;
  }
`;

const Receive = () => {
  const dispatch = useDispatch();
  const [qrVisible, setQrVisible] = useState(false);
  const receiveAmount = useSelector(selectReceiveAmount());
  const addressFull = useSelector(selectAddress());

  const address = compact(addressFull);

  useEffect(
    () => () => {
      dispatch(resetReceive());
    },
    [dispatch],
  );

  const { amount, asset_id } = receiveAmount;

  const [maxAnonymity, setMaxAnonymity] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(generateAddress.request({ type: maxAnonymity ? 'max_privacy' : 'offline' }));
  }, [dispatch, maxAnonymity]);

  const copyAddress = async () => {
    toast('Address copied to clipboard');
    await copyToClipboard(addressFull);
  };

  const submitForm = async () => {
    await copyAddress();

    navigate(ROUTES.WALLET.BASE);
  };

  const copyAndCloseQr = async () => {
    await copyAddress();
    setQrVisible(false);
  };

  return (
    <Window title="Receive">
      <Popup
        visible={qrVisible}
        title=""
        onCancel={() => setQrVisible(false)}
        confirmButton={(
          <Button icon={CopySmallIcon} pallete="orange" onClick={copyAndCloseQr}>
            copy and close
          </Button>
        )}
        footerClass="qr-code-popup"
        cancelButton={null}
        footer
      >
        <QrCodeWrapper>
          <div className="qr-cd">
            <QRCode value={`${addressFull}`} size={220} bgColor="white" />
          </div>
          {maxAnonymity ? (
            <>
              <div className="text"> Transaction can last at most 72 hours.</div>
              <br />
              <div className="text">Min transaction fee is 0.01 SC3.</div>
            </>
          ) : (
            <>
              <div className="text">Sender will be given a choice between regular and offline payment.</div>
              <br />
              <div className="text">
                For online payment to complete, you should get online during the 12 hours after coins are sent.
              </div>
            </>
          )}
        </QrCodeWrapper>
      </Popup>

      <Section title={`Address ${maxAnonymity ? '(Maximum anonymity)' : ''}`} variant="gray">
        <AddressStyled>
          {address}
          &nbsp;
          <Button variant="icon" pallete="white" icon={IconQrCode} onClick={() => setQrVisible(true)} />
          <Button variant="icon" pallete="white" icon={CopySmallIcon} onClick={copyAddress} />
        </AddressStyled>
      </Section>
      <Section title="requested amount (optional)" variant="gray">
        <AmountInput
          value={amount}
          asset_id={asset_id}
          pallete="black"
          onChange={(e) => dispatch(setReceiveAmount(e))}
        />
      </Section>
      <Section title="Advanced" variant="gray" collapse>
        <RowStyled>
          <LabelStyled htmlFor="ma">Maximum anonymity set </LabelStyled>
          <Toggle id="ma" value={maxAnonymity} onChange={() => setMaxAnonymity((v) => !v)} />
        </RowStyled>
      </Section>
      {maxAnonymity ? (
        <WarningStyled>
          Transaction can last at most 72 hours.
          <br />
          <br />
          Min transaction fee is 0.01 SC3.
        </WarningStyled>
      ) : (
        <WarningStyled>
          Sender will be given a choice between regular and offline payment.
          <br />
          <br />
          For online payment to complete, you should get online during the 12 hours after coins are sent.
        </WarningStyled>
      )}

      {/* <Section title="Comment" variant="gray" collapse>
          <Input variant="gray" />
        </Section> */}
      <Button pallete="orange" type="button" onClick={submitForm}>
        copy and close
      </Button>
    </Window>
  );
};

export default Receive;
