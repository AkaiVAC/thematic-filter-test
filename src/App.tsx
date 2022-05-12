import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'reactstrap';

import Loading from './components/Loading';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Profile from './components/Profile';
import Filter from './components/Filter';
import { Auth0ContextInterface, withAuth0 } from '@auth0/auth0-react';

// styles
import './App.css';

// fontawesome
import initFontAwesome from './utils/initFontAwesome';
initFontAwesome();

interface AppProps {
  auth0: Auth0ContextInterface;
}

class App extends Component<AppProps> {
  render() {
    const { isLoading, error } = this.props.auth0;

    if (error) {
      return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div id='app' className='d-flex flex-column h-100'>
        <NavBar />
        <Container className='flex-grow-1 mt-5'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/filters' element={<Filter />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </Container>
      </div>
    );
  }
}

export default withAuth0(App);
