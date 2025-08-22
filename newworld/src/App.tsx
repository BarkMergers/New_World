import { BrowserRouter, Routes, Route } from "react-router-dom";  // Link

import './App.css'
import { useMsal } from '@azure/msal-react';
import Dashboard from "./screens/home/dashboard/Dashboard";
import Home from "./screens/home/home/Home";

//import { POST, SafeFetch } from './helpers/fetch';
//import type { SilentRequest } from "@azure/msal-browser";
import NavBar from "./elements/navBar/NavBar";
import Customer from "./screens/customer/customer/Customer";


import { globalData, UserContext } from "./helpers/globalData";
import SpinnerLoader from "./elements/spinnerLoader/SpinnerLoader";
import Plain from "./screens/home/plain/Plain";
import { HandleLogout, HandleLogin } from "./helpers/signin";

function App() {

    const { instance, accounts } = useMsal();



    //const handleLogin = async () => {
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



    return (
    <>
        <UserContext.Provider value={globalData}>
                <BrowserRouter>

                <SpinnerLoader></SpinnerLoader>

                <div className="">
                        <NavBar accounts={accounts} handleLogin={() => HandleLogin(instance)} handleLogout={() => HandleLogout(instance)}></NavBar>
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





