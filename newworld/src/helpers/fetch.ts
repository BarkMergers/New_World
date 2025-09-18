import type { GlobalData } from "../models/GlobalData";
import { ForceLogin } from "./msal";

const URLROOT = import.meta.env.VITE_DAISY_SERVER_ROOT;

export const POST = function(data: object) {
    return {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include"
    }
}

export const GET = function () {
    return {
        method: "GET",
        credentials: "include"
    }
}

export const SafeFetchJson = async function (url: string, data: object, globalData?: GlobalData | undefined) {
    globalData?.SetSpinnerVisible(true);
    const response = await SafeFetch(url, data);
    globalData?.SetSpinnerVisible(false);

    if (response != null) {
        return await response.json();
    }
}

export const SafeFetch = async function (url: string, data: object) {

    let response;
    let errorText;
    try {
        response = await fetch(URLROOT + url, data);
        if (!response.ok) {
            errorText = await response.text();
            throw new Error(`${response.status}: ${errorText}`);
        }
        return response;
    }
    catch (ex) {
        switch (response == null ? null : response.status) {
            case 406:
                {
                    ForceLogin();
                    return null;
                }
            default:
                {
                    alert(`${ex}: at request '${URLROOT}${url}'`);
                    return null;
                }
        }
    }
}