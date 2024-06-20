import React from 'react';
import Router from './utils/router/Router';
import { GlobalStyle } from './utils/GlobalStyle';
import AppLayout from './layout/AppLayout';

const App: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <AppLayout>
                <Router />
            </AppLayout>
        </>
    );
};

export default App;
