import { useState, useEffect } from 'react';

import { useContext } from "react";
import { UserContext } from '../../helpers/globalData';

import Input from '../../components/input/Input';
import Check from '../../components/check/Check';
import Label from '../../components/label/Label';
import Modal from '../../components/modal/Modal';

import { SafeFetchJson, GET, SafeFetch, POST } from '../../helpers/fetch';
import type { Agent } from '../../models/Agent';
import type { AccountInfo } from "@azure/msal-browser";
import Select from '../../components/select/Select';

export default function MyDetails({ accounts }: { accounts: AccountInfo[] }) {

    // Access global functions
    const globalData = useContext(UserContext);

    // Store the record loaded from the server
    const [data, setData] = useState<Agent>({ color: "", job: "", name: "", selected: false});

    // Trigger the loading of the record when the component mounts
    useEffect(() => {
        if (accounts.length == 1)
            getAgent();
    }, [accounts]);

    // Load from the server - an Async function
    const getAgent = async () => {
        globalData.SetSpinnerVisible(true);
        const data = await SafeFetchJson(`api/GetAgent/${accounts[0].username}`, GET());
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

    const jobList = ["Admin", "Comms", "Dev", "Agent"];

    return (
        <>
            <Modal id="my_save" title="Admin">
                Save was succesful!
            </Modal>

            <form onSubmit={handleSubmit} className="mx-auto my-10">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs p-4">
         
                    <h1>My Details...</h1>
         
                    <div>
                        <Label title="Username">{data?.name || ""}</Label>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <Input value={data?.color || ""} type="text" title="Color" placeholder="Your favorite colour" onChange={(e) => updateData('color', e.target.value)} />

                                <Select value={data?.job || ""} data={jobList} title="Job" onChange={(e) => updateData('job', e.target.value)} />

                                <Input value={data?.name || ""} type="text" title="Name" placeholder="Your name" onChange={(e) => updateData('name', e.target.value)} />

                                <Check value={data?.selected || false} title="Selected" onChange={(e) => updateData('selected', e.target.checked)} />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mx-auto mt-4">Save</button>

                </fieldset>
            </form>


        </>
    );
}