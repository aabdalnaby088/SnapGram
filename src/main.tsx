// import React from 'react'
// import  ReactDOM  from 'react-dom/client'
// import App from './App'
// import { BrowserRouter } from 'react-router-dom'
// import AuthProvider from './context/AuthContext.tsx'
// import { QueryProvider } from '../@/lib/react-query/QueryProvider.tsx'
// import { Account } from 'appwrite'
//     ReactDOM.createRoot( document.getElementById('root')! ).render(
//         <BrowserRouter basename='/SnapGram/'>
//         <QueryProvider>
//         <AuthProvider>
//         <App/>
//         </AuthProvider>
//         </QueryProvider>
//         </BrowserRouter>
//     )

// import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext.tsx';
import { QueryProvider } from '../@/lib/react-query/QueryProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <QueryProvider>
        <AuthProvider>
            <App/>
        </AuthProvider>
        </QueryProvider>
    </HashRouter>
);
