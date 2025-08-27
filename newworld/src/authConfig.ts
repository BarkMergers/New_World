const DAISY_TENANT_ID = import.meta.env.VITE_DAISY_TENANT_ID;
const DAISY_FRONTEND_CLIENT_ID = import.meta.env.VITE_DAISY_FRONTEND_CLIENT_ID;
const DAISY_BACKEND_CLIENT_ID = import.meta.env.VITE_DAISY_BACKEND_CLIENT_ID;

export const msalConfig = {
    auth: {
        clientId: DAISY_FRONTEND_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${DAISY_TENANT_ID}`,
        redirectUri: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        navigateToLoginRequestUrl: true
    },
    cache: {
        cacheLocation: "localStorage",  // or "localStorage" for multi-tab SSO
        storeAuthStateInCookie: false,
    },
};

export const loginRequest = {
    scopes: [
        `api://${DAISY_BACKEND_CLIENT_ID}/.default`
    ]
};