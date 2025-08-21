import { BrowserRouter, Routes, Route } from "react-router-dom";  // Link
import { loginRequest } from './authConfig';
import './App.css'
import { useMsal } from '@azure/msal-react';
import Dashboard from "./screens/home/dashboard/Dashboard";
import Home from "./screens/home/home/Home";

import { POST, SafeFetch } from './helpers/fetch';
import type { SilentRequest } from "@azure/msal-browser";
import NavBar from "./elements/navBar/NavBar";
import Customer from "./screens/customer/customer/Customer";


import { globalData, UserContext } from "./helpers/globalData";
import SpinnerLoader from "./elements/spinnerLoader/SpinnerLoader";
import Plain from "./screens/home/plain/Plain";

function App() {

    const { instance, accounts } = useMsal();

    const getSubdomain = (): string => {
        const x = window.location.hostname.split('.').splice(1, 1).join(".");
        return x == "" ? "dev" : x;
    };

    const handleLogin = async () => {
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
                    POST({ Token: result.accessToken, Tenant: getSubdomain() })
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
                    POST({ Token: popupResult.accessToken, Tenant: getSubdomain() })
                );

                // loginNavigationFunction();
            }
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    const handleLogout = async () => {
        instance.logoutPopup();
        await SafeFetch("api/RemoveToken", POST({}));
    };

    return (
    <>
        <UserContext.Provider value={globalData}>
                <BrowserRouter>

                <SpinnerLoader></SpinnerLoader>

                <div className="">
                    <NavBar accounts={accounts} handleLogin={handleLogin} handleLogout={handleLogout}></NavBar>
                </div>

                <div className="h-screen flex-grow p-4">
                    <Routes>
                            <Route path="/dashboard" element={<Dashboard />}></Route>
                            <Route path="/home" element={<Home />}></Route>
                            <Route path="/customer" element={<Customer />}></Route>
                            <Route path="/plain" element={<Plain accounts={accounts} />}></Route>
                            <Route path="/" element={<Home />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </UserContext.Provider>
    </>
  )
}

export default App





