import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient;


const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MsalProvider instance={msalInstance}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </MsalProvider>  
    </StrictMode>,
)