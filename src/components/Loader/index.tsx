import React, { FC } from 'react';
import classNames from 'classnames';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import styles from './Loader.module.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface LoaderProps {
  center?: boolean;
}

const Loader: FC<LoaderProps> = ({ center = true }) => {
  return (
    <div
      className={classNames({
        [styles.center]: center,
      })}
    >
      <Spin indicator={antIcon} />
    </div>
  );
};

export default Loader;
