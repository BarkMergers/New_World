import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import { loginRequest } from "./authConfig";

export const msalInstance = new PublicClientApplication(msalConfig);

export function ForceLogin() {
    msalInstance.loginRedirect(loginRequest);
}