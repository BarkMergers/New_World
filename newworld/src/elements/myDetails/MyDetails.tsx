import { Input, Label, Check, Modal, Select } from '../../components'
import { useState, useEffect } from 'react';
import { useContext } from "react";
import { UserContext } from '../../helpers/globalData';
import { SafeFetchJson, GET, SafeFetch, POST } from '../../helpers/fetch';
import { ForceLogin } from '../../helpers/msal'
import type { AccountInfo } from "@azure/msal-browser";
import type { OldAgent } from '../../models/AgentOld';

export default function MyDetails({ accounts }: { accounts: AccountInfo[] }) {

    // Access global functions
    const globalData = useContext(UserContext);

    // Store the record loaded from the server
    const [data, setData] = useState<OldAgent>({ active: false, age: 0, agent: "", firstname: "", lastname: "", role: "", tenant: "" });

    // Trigger the loading of the record when the component mounts
    useEffect(() => {
        if (accounts.length == 1)
            getAgent();
        else
            ForceLogin();
    }, [accounts]);

    // Load from the server - an Async function
    const getAgent = async () => {
        globalData.SetSpinnerVisible(true);
        const data = await SafeFetchJson(`api/GetAgentDetails/${accounts[0].username}`, GET());
        setData(data);
        globalData.SetSpinnerVisible(false);
    }

    // Submit the record held in 'data' to the server
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        globalData.SetSpinnerVisible(true);

        await SafeFetch('api/SaveAgent', POST(data))
            .then((data) => {
                globalData.SetSpinnerVisible(false);

                if (data != null) {
                    const dialog = document.getElementById('my_save') as HTMLDialogElement;
                    dialog.showModal();
                }
        });
    }

    // Update the 'data' record held in the useState
    const updateData = (field: string, value: string | number | boolean) => {
        setData({ ...data, [field]: value });
    }

    const roleList = ["Admin", "Comms", "Dev", "Agent"];

    return (
        <div className="m-auto w-full">
            <Modal id="my_save" title="Admin">
                Save was succesful!
            </Modal>

            <form onSubmit={handleSubmit}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box m-auto w-xs p-4">

                    <h1>My Details...</h1>

                    <div>
                        <Label title="Username">{data?.agent || ""}</Label>

                        <div className="grid grid-cols-2 gap-8">
                            <div>

                                <Label title="Tenant">{data?.tenant}</Label>

                                <Input value={data?.firstname || ""} type="text" title="First name" placeholder="Your first name" onChange={(e) => updateData('firstname', e.target.value)} />

                                <Input value={data?.lastname || ""} type="text" title="Last name" placeholder="Your last name" onChange={(e) => updateData('lastname', e.target.value)} />

                                <Select value={data?.role || ""} data={roleList} title="Role" onChange={(e) => updateData('role', e.target.value)} />

                                <Input value={data?.age || ""} type="number" title="Age" placeholder="Your age" onChange={(e) => updateData('age', e.target.value)} />

                                <Check value={data?.active || false} title="Active" onChange={(e) => updateData('active', e.target.checked)} />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mx-auto mt-4">Save</button>

                </fieldset>
            </form>

        </div>
    );
}