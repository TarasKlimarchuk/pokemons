import React, { FC } from 'react';

import { Divider } from 'antd';
import Title from 'antd/lib/typography/Title';

import styles from './Header.module.scss';

const Header: FC = () => {
  return (
    <header className={styles.container}>
      <Title className={styles.title} level={1}>
        Pokemons
      </Title>
      <Divider />
    </header>
  );
};

export default Header;
