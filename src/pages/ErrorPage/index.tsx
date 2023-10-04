import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button, Result } from 'antd';

const ErrorPage: FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="link">
          <Link to="/">Back Home</Link>
        </Button>
      }
    />
  );
};

export default ErrorPage;
