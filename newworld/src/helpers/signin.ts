import { loginRequest } from "../authConfig";
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
        await instance.loginPopup(loginRequest);

        const account = instance.getAllAccounts()[0];
        if (!account) throw new Error("No account found after login");

        // Build a request object that includes the account
        const silentRequest: SilentRequest = {
            ...loginRequest,
            account,
            forceRefresh: true,
        };

        try {
            const result = await instance.acquireTokenSilent(silentRequest);

            await SafeFetch(
                "api/StoreToken",
                POST({ Token: result.accessToken, Tenant: GetSubdomain() })
            );

            // loginNavigationFunction();
        } catch (silentError) {
            console.warn("Silent token failed, trying popup:", silentError);

            const popupResult = await instance.acquireTokenPopup({
                ...loginRequest,
                account,
            });

            await SafeFetch(
                "api/StoreToken",
                POST({ Token: popupResult.accessToken, Tenant: GetSubdomain() })
            );

            // loginNavigationFunction();
        }
    } catch (err) {
        console.error("Login failed:", err);
    }
};