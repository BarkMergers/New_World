import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

export default function Logout() {
    const { instance } = useMsal();

    useEffect(() => {
        instance.logoutRedirect({
            postLogoutRedirectUri: `${window.location.origin}/logout-close`
        });
    }, [instance]);

    return <p>Auto Logging out...</p>;
}


export function LogoutClose() {
    useEffect(() => {
        // Give the logout redirect a moment, then close this tab
        setTimeout(() => {
            window.close();
        }, 500);
    }, []);

    return <p>You have been logged out. This tab will close.</p>;
}