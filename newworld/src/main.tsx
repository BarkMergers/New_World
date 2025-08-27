import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig, loginRequest } from './authConfig';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient;


const msalInstance = new PublicClientApplication(msalConfig);




async function bootstrap() {
    // 1. Initialize MSAL
    await msalInstance.initialize();

    // 2. Handle redirects and sign in if needed
    try {
        const response = await msalInstance.handleRedirectPromise();
        if (response && response.account) {
            msalInstance.setActiveAccount(response.account);
        } else {
            const accounts = msalInstance.getAllAccounts();
            if (accounts.length > 0) {
                msalInstance.setActiveAccount(accounts[0]);
            } else {
                // Uncomment if you want automatic login on each site
                await msalInstance.loginRedirect(loginRequest);
            }
        }
    } catch (error) {
        console.error("MSAL redirect error:", error);
    }

    // 3. Render your app
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

// Call bootstrap to start the app
bootstrap();




//// --- ADD THIS SECTION: handle redirects and auto login ---
//msalInstance.handleRedirectPromise().then((response) => {
//    if (response && response.account) {
//        // Came back from a loginRedirect, set the active account
//        msalInstance.setActiveAccount(response.account);
//    } else {
//        const accounts = msalInstance.getAllAccounts();
//        if (accounts.length > 0) {
//            // Already signed in, set the first account active
//            msalInstance.setActiveAccount(accounts[0]);
//        } else {
//            // Not signed in yet; choose what you want here:
//            // For automatic SSO, uncomment the next line:
//            msalInstance.loginRedirect(loginRequest);
//            //
//            // Or leave it commented to show a login button in your app.
//        }
//    }
//}).catch((error) => {
//    console.error("MSAL redirect error:", error);
//});
//// --- END SECTION ---



//createRoot(document.getElementById('root')!).render(
//    <StrictMode>
//        <MsalProvider instance={msalInstance}>
//            <QueryClientProvider client={queryClient}>
//                <App />
//            </QueryClientProvider>
//        </MsalProvider>  
//    </StrictMode>,
//)