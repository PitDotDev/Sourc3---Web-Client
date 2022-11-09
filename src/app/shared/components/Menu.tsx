import React from 'react';

import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import { IconProfile, IconSettings } from '@app/shared/icons';

import { ROUTES } from '@app/shared/constants';
import { useNavigate } from 'react-router-dom';
// import config from '@app/config';
import { useSelector } from 'react-redux';
import { selectProfiles } from '@app/containers/Manage/store/selector';
import Button from './Button';
import { avatar } from '../constants/profile';

const MENU_ITEMS = [
  {
    title: 'Wallet',
    value: ROUTES.WALLET.PROFILE,
    icon: IconProfile,
  },
  {
    title: 'Settings',
    value: ROUTES.SETTINGS.BASE,
    icon: IconSettings,
  },
];

const ContainerStyled = styled.nav`
  position: absolute;
  width: 95px;
  right: 0;
  z-index: 4;
`;

const ListStyled = styled.ul`
  display: flex;
  width: 95px;
  align-items: center;
  justify-content: flex-end;
  margin: 12px 0;
`;
const ListItemStyled = styled.li``;

// const buttonStyle = css`
//   position: absolute;
//   top: 24px;
//   left: 24px;
//   margin: 0;
// `;
const avatarSmall = css`
  svg {
    width: 32px;
    height: 32px;
    //  viewBox: 0 0 32px 32px;
    & > circle {
      cx: 16;
      cy: 16;
      r: 16;
    }
  }
`;

interface MenuProps {
  onCancel?: React.MouseEventHandler;
}

const Menu: React.FC<MenuProps> = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  const handleClick: React.MouseEventHandler<HTMLLIElement> = ({ currentTarget }) => {
    const index = parseInt(currentTarget.dataset.index, 10);
    const item = MENU_ITEMS[index];
    if (!item.outside) {
      navigate(item.value);
    } else {
      window.open(item.value);
    }
  };
  const profile = useSelector(selectProfiles());
  const data = profile && Object.values(profile).filter((item) => item.active === true);

  return (
    <ContainerStyled>
      <ListStyled>
        {/* {MENU_ITEMS.map(({ title, value, icon }, index) => (
          <ListItemStyled key={value} data-index={index} onClick={handleClick}>
            <Button variant="icon" icon={icon} />
          </ListItemStyled>
        ))} */}
        {data
          && data.map((item) => (
            <>
              <ListItemStyled data-index={0} key={ROUTES.WALLET.PROFILE} onClick={handleClick}>
                <Button variant="icon" icon={avatar[item.avatar]} className={avatarSmall} />
              </ListItemStyled>
              <ListItemStyled data-index={1} key={ROUTES.SETTINGS.BASE} onClick={handleClick}>
                <Button variant="icon" icon={IconSettings} />
              </ListItemStyled>
            </>
          ))}
      </ListStyled>
    </ContainerStyled>
  );
};

export default Menu;
