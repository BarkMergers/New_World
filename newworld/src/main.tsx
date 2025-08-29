import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';  //loginRequest

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient;


const msalInstance = new PublicClientApplication(msalConfig);




async function bootstrap() {





    //await msalInstance.initialize();


    //try {
    //    const response = await msalInstance.handleRedirectPromise();
    //    if (response && response.account) {
    //        msalInstance.setActiveAccount(response.account);
    //    } else {
    //        const accounts = msalInstance.getAllAccounts();
    //        if (accounts.length > 0) {
    //            msalInstance.setActiveAccount(accounts[0]);
    //        } else {
    //            // Uncomment if you want automatic login on each site
    //            await msalInstance.loginRedirect(loginRequest);
    //        }
    //    }
    //} catch (error) {
    //    console.error("MSAL redirect error:", error);
    //}


    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <MsalProvider instance={msalInstance}>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </MsalProvider>
        </StrictMode>,
    );
}




bootstrap();

