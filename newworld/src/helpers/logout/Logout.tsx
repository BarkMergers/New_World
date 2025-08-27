import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

export default function Logout() {
    const { instance } = useMsal();

    useEffect(() => {
        instance.logoutPopup({
            mainWindowRedirectUri: "/", // where to return user after logout
        });
    }, [instance]);

    return <p>Auto Logging out...</p>;
}