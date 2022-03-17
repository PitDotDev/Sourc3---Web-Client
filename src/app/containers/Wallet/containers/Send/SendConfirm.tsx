/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { Section, Button, Rate } from '@app/shared/components';

import { ArrowUpIcon } from '@app/shared/icons';

import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import { fromGroths, compact, toGroths } from '@core/utils';
import { AddressData, AddressType } from '@core/types';
import { AssetTotal, TransactionAmount } from '@app/containers/Wallet/interfaces';

const BeamAmount = styled.p`
  font-weight: bold;
  color: var(--color-orange);
  margin: 0;
`;

const formMid = css`
margin-left: 25px;`;
const getTxType = (type: AddressType, offline: boolean): string => {
  if (type === 'max_privacy') {
    return 'Maximum anonymity';
  }
  if (type === 'public_offline') {
    return 'Public offline';
  }

  return offline ? 'Offline' : 'Regular';
};

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

  const { asset_id, amount } = send_amount;

  const value = toGroths(parseFloat(amount));

  const { available, metadata_pairs } = selected;

  const { type: addressType } = addressData;

  const remaining = asset_id === 0 ? available - fee - value : available - value;

  const txType = getTxType(addressType, offline);

  const beamRemaining = beam.available - fee;

  return (
    <form
      className={formMid}
      onSubmit={(e) => {
        e.preventDefault();
        submitSend();
      }}
    >
      <Section variant="receipt" subtitle="Send to">{compact(address)}</Section>
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
      )}
      <Button type="submit" pallete="orange" icon={ArrowUpIcon} style={{ marginTop: '30px' }}>
        send
      </Button>
    </form>
  );
};

export default SendConfirm;
