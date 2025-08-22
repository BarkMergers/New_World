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
import CustomerDetails from "./screens/customer/customerDetails/CustomerDetails";

function App() {

    const { instance, accounts } = useMsal();

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
                            <Route path="/customer/:id" element={<CustomerDetails />}></Route>
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





