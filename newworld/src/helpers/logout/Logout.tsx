import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

export default function Logout() {
    const { instance } = useMsal();

    
    useEffect(() => {
        instance.logoutRedirect();
        alert(2);
    }, [instance]);

    return <p>Auto Logging out...</p>;
}