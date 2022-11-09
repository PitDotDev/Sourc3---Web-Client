/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {
  Section, Button, Rate, Title,
} from '@app/shared/components';

import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import {
  fromGroths, compact, toGroths, truncate, getTxType, convertLowAmount,
} from '@core/utils';
import { AddressData } from '@core/types';
import { AssetTotal, TransactionAmount } from '@app/containers/Wallet/interfaces';
import { useSelector } from 'react-redux';
import { selectParsedAddressUD } from '../../store/selectors';

const SC3Amount = styled.p`
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.5);
  margin: 0;
`;
const SC3 = css`
  font-weight: 800;
  font-size: 18px;
  line-height: 22px;
`;

const formMid = css`
  position: absolute;
  top: 155px;
};`;

const wrapper = css`
  width: 300px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 24px;
  margin-bottom: 16px;
`;
const subtitle = css`
  font-weight: 800 !important;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.1px;
  width: 100px;
  text-align: left;
`;
const receiptValue = css`
  font-weight: 800 !important;
  font-size: 16px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.5);
  text-align: left;
`;

interface SendConfirmProps {
  address: string;
  offline: boolean;
  send_amount: TransactionAmount;
  selected: AssetTotal;
  beam: AssetTotal;
  addressData: AddressData;
  fee: number;
  change: number;
  asset_change: number;
  submitSend: () => void;
}

const SendConfirm = (props: SendConfirmProps) => {
  const {
    address, offline, send_amount, selected, addressData, fee, change, submitSend, beam, asset_change,
  } = props;

  const parsed_address_ud = useSelector(selectParsedAddressUD());

  const { asset_id, amount } = send_amount;

  const value = toGroths(parseFloat(amount));

  const { available, metadata_pairs } = selected;

  const { type: addressType } = addressData;

  const remaining = asset_id === 0 ? available - fee - value : available - value;

  const txType = getTxType(addressType, offline);

  const beamRemaining = beam.available - fee;

  return (
    <>
      <Title variant="auth">Confirmation</Title>
      <form
        className={formMid}
        onSubmit={(e) => {
          e.preventDefault();
          submitSend();
        }}
      >
        {/* TODO:CREATE component */}
        <div className={wrapper}>
          <span className={subtitle}>Send to</span>
          <div className={receiptValue}>{compact(address)}</div>
        </div>
        <div className={wrapper}>
          <span className={subtitle}>Type</span>
          <div className={receiptValue}>{txType}</div>
        </div>
        <div className={wrapper}>
          <span className={subtitle}>Amount</span>
          <div className={receiptValue}>
            <SC3Amount className={SC3}>
              {convertLowAmount(Number(amount))}
              {' '}
              {truncate(metadata_pairs.UN)}
            </SC3Amount>
            {selected.asset_id === 0 && <Rate value={value} groths />}
          </div>
        </div>
        <div className={wrapper}>
          <span className={subtitle}>Fee</span>
          <div className={receiptValue}>
            <SC3Amount>
              {convertLowAmount(fromGroths(fee))}
              {' '}
              {truncate(metadata_pairs.UN)}
            </SC3Amount>
            <Rate value={fee} groths />
          </div>
        </div>
        <div className={wrapper}>
          <span className={subtitle}>Change</span>
          <div className={receiptValue}>
            <SC3Amount>
              {convertLowAmount(fromGroths(selected.asset_id === 0 ? change : asset_change))}
              {' '}
              {truncate(metadata_pairs.UN)}
            </SC3Amount>
            <Rate value={selected.asset_id === 0 ? change : asset_change} groths />
          </div>
        </div>
        <div className={wrapper}>
          <span className={subtitle}>Remaining</span>
          <div className={receiptValue}>
            <SC3Amount>
              {convertLowAmount(fromGroths(remaining))}
              {' '}
              {truncate(metadata_pairs.UN)}
            </SC3Amount>
            <Rate value={remaining} groths />
          </div>
        </div>
        {selected.asset_id !== 0 && (
          <div className={wrapper}>
            <span className={subtitle}>SC3 Remaining</span>
            <div className={receiptValue}>
              <SC3Amount>
                {convertLowAmount(fromGroths(beamRemaining))}
                {' '}
                {truncate(metadata_pairs.UN)}
              </SC3Amount>
              <Rate value={beamRemaining} groths />
            </div>
          </div>
        )}
        {/* <Section variant="receipt" subtitle="Send to">{compact(address)}</Section>
        <Section variant="receipt" subtitle="Transaction type">{txType}</Section>
        <Section variant="receipt" subtitle="Amount">
          <BeamAmount>
            {fromGroths(value)}
          &nbsp;
            {metadata_pairs.UN}
          </BeamAmount>
        </Section>
        <Section variant="receipt" subtitle="Transaction Fee">
          {fromGroths(fee)}
        &nbsp;SC3
          <Rate value={fee} groths />
        </Section>
        <Section variant="receipt" subtitle="Change">
          {fromGroths(selected.asset_id === 0 ? change : asset_change)}
        &nbsp;
          {metadata_pairs.UN}
          <Rate value={selected.asset_id === 0 ? change : asset_change} groths />
        </Section>
        <Section variant="receipt" subtitle="Remaining">
          {fromGroths(remaining)}
        &nbsp;
          {metadata_pairs.UN}
          <Rate value={remaining} groths />
        </Section>
        {selected.asset_id !== 0 && (
        <Section variant="receipt" subtitle="Beam Remaining">
          {fromGroths(beamRemaining)}
          &nbsp;BEAM
          <Rate value={beamRemaining} groths />
        </Section>
        )} */}
        <Button type="submit" pallete="orange" style={{ margin: '56px 56px 0' }}>
          Send
        </Button>
      </form>
    </>
  );
};

export default SendConfirm;
