import React from 'react';
import { Router, RouteComponentProps } from '@reach/router';

import { Header } from './components/Header';
import { Login } from './components/Login';
import { Register } from './components/Register';

const App: React.FC = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <Header />
      <Router>
        <RouterPage path="/register" pageComponent={<Register />} />
        <RouterPage path="/login" pageComponent={<Login />} />
      </Router>
    </div>
  );
};

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) => props.pageComponent;

export default App;
