import { BrowserRouter, Routes, Route } from "react-router-dom";  // Link
import {  lazy } from 'react';
import './App.css'
import { useMsal } from '@azure/msal-react';

//import { POST, SafeFetch } from './helpers/fetch';
//import type { SilentRequest } from "@azure/msal-browser";
import NavBar from "./elements/navBar/NavBar";


import { globalData, UserContext } from "./helpers/globalData";
import SpinnerLoader from "./elements/spinnerLoader/SpinnerLoader";
import { HandleLogout, HandleLogin } from "./helpers/signin";
import Modal from "./components/modal/Modal";


const Home = lazy(() => import('./screens/home/home/Home'));
const Dashboard = lazy(() => import('./screens/home/dashboard/Dashboard'));
const Plain = lazy(() => import('./screens/home/plain/Plain'));
const CustomerDetails = lazy(() => import('./screens/customer/customerDetails/CustomerDetails'));
const Customer = lazy(() => import('./screens/customer/customer/Customer'));
const Logout = lazy(() => import('./helpers/logout/Logout'));

function App() {

    const { instance, accounts } = useMsal();

    return (
    <>
        <UserContext.Provider value={globalData}>
                <BrowserRouter>

                <SpinnerLoader></SpinnerLoader>

                <Modal id="generic_message_box" title="Admin">
                    Customer was not succesfully saved, but was passed to the server
                </Modal>

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
                        <Route path="/logout" element={<Logout />}></Route>
                        <Route path="/" element={<Dashboard />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </UserContext.Provider>
    </>
  )
}

export default App





