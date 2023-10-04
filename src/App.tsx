import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Result } from 'antd';

import { ErrorBoundary, Header, Router } from './components';

function App() {
  return (
    <>
      <Header />
      <ErrorBoundary
        fallback={
          <Result
            status="error"
            title="Something went wrong"
            extra={
              <Button type="link">
                <Link to={'/'}>Back Home</Link>
              </Button>
            }
          />
        }
      >
        <Router />
      </ErrorBoundary>
    </>
  );
}

export default App;
