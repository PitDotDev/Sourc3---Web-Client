import React, { useEffect, useState } from 'react';

import { css } from '@linaria/core';
import { Button, Window } from '@app/shared/components';

import { ROUTES } from '@app/shared/constants';
import { useNavigate } from 'react-router-dom';
import { SeedList } from '@app/containers/Auth/components';

import { useDispatch, useSelector } from 'react-redux';
import { setRegistrationSeed, setSeedResult, updateSeedList } from '@app/containers/Auth/store/actions';
import { selectSeedCache, selectSeedErrors, selectSeedValues } from '@app/containers/Auth/store/selectors';

const buttonClassName = css`
  position: absolute;
  bottom: 65px;
  // bottom: 25px;
  left: 0;
  margin: 0 56px !important;
`;

const Restore: React.FC = () => {
  const [interval, updateInterval] = useState<null | NodeJS.Timer>(null);
  const [cache, setCache] = useState('');

  const dispatch = useDispatch();

  const errors = useSelector(selectSeedErrors());
  const seedCache = useSelector(selectSeedCache());
  const seedValues = useSelector(selectSeedValues());

  const valid = !errors.filter((v) => !v).length;

  const navigate = useNavigate();

  useEffect(() => {
    if (seedCache) {
      setCache(cache);
    }
  }, [cache, seedCache]);

  useEffect(() => {
    if (seedValues.length === 12) {
      const v = `${seedValues.toString().replace(new RegExp(',', 'g'), ';')};`;
      setCache(v);
    }
  }, [seedValues]);

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = data.values() as IterableIterator<string>;

    const seed = Array.from(values).reduce((result, value, index) => (index === 0 ? value : `${result} ${value}`));

    dispatch(setSeedResult(seed));
    dispatch(setRegistrationSeed({ registration_seed: seed, is_restore: true }));
    navigate(ROUTES.AUTH.SET_PASSWORD);
  };

  const seedListHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (interval) {
      clearTimeout(interval);
      updateInterval(null);
    }
    const i = setTimeout(() => {
      dispatch(updateSeedList.request(e));
    }, 200);
    updateInterval(i);
  };
  const handlePrevious: React.MouseEventHandler = () => {
    navigate(ROUTES.AUTH.BASE);
  };

  return (
    <Window padding="auth" type="auth" title="Restore web client" onPrevious={handlePrevious}>
      <p>Type in your seed phrase</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <SeedList data={errors} initial={cache} onInput={(e) => seedListHandler(e)} />
        <Button type="submit" disabled={!valid} className={buttonClassName}>
          Submit
        </Button>
      </form>
    </Window>
  );
};

export default Restore;
