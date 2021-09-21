import React, { useState } from 'react';
import { useStore } from 'effector-react';
import { styled } from '@linaria/react';

import {
  Window, Button, Input, Footer,
} from 'app/uikit';
import { $seed } from '@app/model/base';
import { View, setView } from '@app/model/view';
import { makeOnChange } from '@core/utils';
import ArrowIcon from '@icons/icon-arrow.svg';

import PasswordStrength from './PasswordStrength';
import WalletController from '@app/core/WalletController';

const FormStyled = styled.form`
  text-align: left;

  > ul {
    margin-bottom: 30px;
    padding-left: 20px;
  }
`;

const SetPassword = () => {
  const seed = useStore($seed);
  const [pass, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const valid = pass !== '' && pass === confirm;

  const onPasswordChange = makeOnChange(setPassword);
  const onConfirmChange = makeOnChange(setConfirm);

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    WalletController.create({seed: seed.join(' '), pass, isConfirmed: true});
    setView(View.PROGRESS);
  };

  return (
    <Window title="Password" onBackClick={() => setView(View.LOGIN)}>
      <FormStyled onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="Password"
          onChange={onPasswordChange}
        />
        <PasswordStrength value={pass} />
        <p>Strong password needs to meet the following requirements:</p>
        <ul>
          <li>the length must be at least 10 characters</li>
          <li>must contain at least one lowercase letter</li>
          <li>must contain at least one uppercase letter</li>
          <li>must contain at least one number</li>
        </ul>
        <Input
          type="password"
          placeholder="Confirm password"
          onChange={onConfirmChange}
        />
        <Footer>
          <Button type="submit" icon={ArrowIcon} disabled={!valid}>
            next
          </Button>
        </Footer>
      </FormStyled>
    </Window>
  );
};

export default SetPassword;
