import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Auth0Provider } from '@auth0/auth0-react';
import config from './auth_config.json';
import history from './utils/history';

import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import './index.css';

const onRedirectCallback = (appState: any) => {
    history.push(
        appState && appState.returnTo
            ? appState.returnTo
            : window.location.pathname
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Auth0Provider
        domain={config.domain}
        clientId={config.clientId}
        audience={config.audience}
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
    >
        <BrowserRouter>
            <RecoilRoot>
                <App />
            </RecoilRoot>
        </BrowserRouter>
    </Auth0Provider>
);
