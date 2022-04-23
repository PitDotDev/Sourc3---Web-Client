import React, { useEffect, useState } from 'react';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import { fromGroths, getSign, truncate } from '@core/utils';
import { Transaction } from '@core/types';
import { useSelector } from 'react-redux';
import { selectAssets } from '@app/containers/Wallet/store/selectors';
import AssetIcon from './AssetIcon';
import Rate from './Rate';

interface AssetLabelProps extends Partial<Transaction> {
  className?: string;
  iconClass?: string;
  showRate?: boolean;
  isBalanceHidden?: boolean;
}

const ContainerStyled = styled.div`
  display: flex;
  position: relative;
  text-align: left;
  font-size: 1em;
  font-weight: 600;
  color: black;
`;

const AmountStyled = styled.span<AssetLabelProps>`
  flex-grow: 1;
  font-weight: 800;
  font-size: 26px;
  line-height: 38px;
  display: flex;
`;

const iconClassName = css`
  position: absolute;
  right: 100%;
  margin-right: 16px;
  top: 7px;
  
`;

const rateStyle = css`
opacity: 0.5;
margin: 0;
color: black;
position: absolute;
top: 40px;
font-size: 14px;
line-height: 17px;
font-weight: 700;
}
`;
const Name = styled.div`
margin-left: 5px
`;
const Label = styled.div`
`;

const AssetLabel: React.FC<AssetLabelProps> = ({
  value,
  asset_id,
  income,
  fee,
  fee_only,
  className,
  iconClass,
  showRate = true,
  isBalanceHidden,
}) => {
  const assets = useSelector(selectAssets());
  const target = assets.find(({ asset_id: id }) => id === asset_id);

  const amount = fromGroths(fee_only ? fee : value);
  const signed = !!income;
  const sign = signed ? getSign(income) : '';
  const name = truncate(target?.metadata_pairs.UN) ?? '';
  const checkAmount = amount < 0.00001 ? `${sign}0.00` : `${sign} ${amount.toFixed(8)}`;
  const [label, setLabel] = useState(checkAmount);

  useEffect(() => {
    console.log(checkAmount);
    if (checkAmount.length > 14) {
      setLabel(`${checkAmount.substring(15, -1)}..`);
    }
  }, [checkAmount]);

  return (
    <ContainerStyled className={className}>
      <>
        <AssetIcon size="large" asset_id={asset_id} className={iconClass || iconClassName} />
        <AmountStyled className="asset-name">
          <Label>{label}</Label>
          <Name>{name}</Name>
        </AmountStyled>

      </>
      {showRate && !isBalanceHidden ? <Rate value={amount} income={income} className={rateStyle} /> : null}
    </ContainerStyled>
  );
};

export default AssetLabel;
