import { useEffect } from "react";

export default function Logout({ handleLogout }: { handleLogout: () => void } ) {

    useEffect(() => {
        handleLogout();
    }, []);

    return (
        <>
            You have logged out
        </>
    );
}