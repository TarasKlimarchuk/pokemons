import React, { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '../index';

interface ReduxProvideProps {
  children: ReactNode;
}

const ReduxProvide: FC<ReduxProvideProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvide;
