import React from 'react';
import { styled } from '@linaria/react';

import AssetLabel from '@app/shared/components/AssetLabel';
import { AssetTotal } from '@app/containers/Wallet/interfaces';

const ListStyled = styled.ul``;

interface AssetsProps {
  data: AssetTotal[];
  isBalanceHidden?: boolean;
}

const ListItemStyled = styled.li<{ opt_color?: string; asset_id: number }>`
  margin-bottom: 10px;
  position: relative;
  padding: 12px 24px;
  padding-left: 66px;

  &:before {
    opacity: 0.3;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;

const Assets: React.FC<AssetsProps> = ({ data, isBalanceHidden }) => (
  <ListStyled>
    {data.map(({ asset_id, available, metadata_pairs }) => (
      <ListItemStyled
        opt_color={metadata_pairs.OPT_COLOR ? metadata_pairs.OPT_COLOR : null}
        key={asset_id}
        asset_id={asset_id}
      >
        <AssetLabel value={available} asset_id={asset_id} isBalanceHidden={isBalanceHidden} />
      </ListItemStyled>
    ))}
  </ListStyled>
);
export default Assets;
