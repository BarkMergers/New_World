import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

export default function Logout() {
    const { instance } = useMsal();

    useEffect(() => {

        document.body.style.opacity = "0";

        async function clearAndClose() {
            try {
                // Clear all MSAL accounts and tokens for this app
                const accounts = instance.getAllAccounts();
                if (accounts.length > 0) {
                    accounts.forEach((account) => {
                        instance.logoutPopup({ account }); // optional: popup clears each account silently
                    });
                }
                // Or simply clear cache without redirecting:
                // instance.getTokenCache().clear();  // if using latest msal-browser API
            } catch (err) {
                console.warn("Logout clear failed:", err);
            }

            // Close this tab after a short delay
            setTimeout(() => {
                window.close();
            }, 500);
        }

        clearAndClose();
    }, [instance]);

    return <p>Logging out and closing...</p>;
}