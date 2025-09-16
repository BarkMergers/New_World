import { loginRequest } from "./authConfig";
import { SafeFetch, POST } from "./fetch";
import { type IPublicClientApplication, type SilentRequest } from "@azure/msal-browser";


export const GetSubdomain = (): string => {
    const x = window.location.hostname.split('.').splice(1, 1).join(".");
    return x == "" ? "dev" : x;
};

export const HandleLogout = async (instance: IPublicClientApplication) => {
    instance.logoutPopup();
    await SafeFetch("api/RemoveToken", POST({}));
};

export const HandleLogin = async (instance: IPublicClientApplication) => {
    try {
        // 1. See if we already have an account
        const accounts = instance.getAllAccounts();
        const account = accounts.length > 0 ? accounts[0] : null;

        // 2. If no account, try to log in (redirect is smoother for SSO across domains)
        if (!account) {
            await instance.loginRedirect(loginRequest);
            return; // The app will reload after redirect
        }

        // 3. We have an account; try to get a token silently
        const silentRequest: SilentRequest = {
            ...loginRequest,
            account,
            forceRefresh: false, // don't force refresh unless necessary
        };


        alert(1);

        try {
            const result = await instance.acquireTokenSilent(silentRequest);

            // Send the token to your backend or store it
            await SafeFetch(
                "api/StoreToken",
                POST({ Token: result.accessToken, Tenant: GetSubdomain() })
            );
        } catch (silentError) {
            console.warn("Silent token failed, trying popup:", silentError);

            // Try popup as fallback
            const popupResult = await instance.acquireTokenPopup({
                ...loginRequest,
                account,
            });

            await SafeFetch(
                "api/StoreToken",
                POST({ Token: popupResult.accessToken, Tenant: GetSubdomain() })
            );
        }

            alert(2);


    } catch (err) {
        console.error("Login failed:", err);
    }
};






//export const HandleLogin = async (instance: IPublicClientApplication) => {
//    try {
//        await instance.loginPopup(loginRequest);

//        const account = instance.getAllAccounts()[0];
//        if (!account) throw new Error("No account found after login");

//        // Build a request object that includes the account
//        const silentRequest: SilentRequest = {
//            ...loginRequest,
//            account,
//            forceRefresh: true,
//        };

//        try {
//            const result = await instance.acquireTokenSilent(silentRequest);

//            await SafeFetch(
//                "api/StoreToken",
//                POST({ Token: result.accessToken, Tenant: GetSubdomain() })
//            );

//            // loginNavigationFunction();
//        } catch (silentError) {
//            console.warn("Silent token failed, trying popup:", silentError);

//            const popupResult = await instance.acquireTokenPopup({
//                ...loginRequest,
//                account,
//            });

//            await SafeFetch(
//                "api/StoreToken",
//                POST({ Token: popupResult.accessToken, Tenant: GetSubdomain() })
//            );

//            // loginNavigationFunction();
//        }
//    } catch (err) {
//        console.error("Login failed:", err);
//    }
//};