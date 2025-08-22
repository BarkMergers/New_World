import { useState, useEffect } from 'react';
import { useContext } from "react";
import { UserContext } from '../../helpers/globalData';
import Input from '../../components/input/Input';
import Label from '../../components/label/Label';
import Modal from '../../components/modal/Modal';
import { SafeFetchJson, GET, SafeFetch, POST } from '../../helpers/fetch';
import type { Customer } from '../../models/Customer';

//import Check from '../../components/check/Check';
//import Select from '../../components/select/Select';

export default function EditCustomerDetails({ id }: {id : string | undefined }) {


    // Access global functions
    const globalData = useContext(UserContext);


    // Store the record loaded from the server
    const [data, setData] = useState<Customer>({ id: 0, increasedate: "", power: 0, vehicle: "" });


    // Trigger the loading of the record when the component mounts
    useEffect(() => {
        getCustomerDetails();
    }, [id]);


    // Load from the server - an Async function
    const getCustomerDetails = async () => {
        globalData.SetSpinnerVisible(true);
        const data = await SafeFetchJson(`api/LoadCustomerDetails/${id}`, GET());
        setData(data);
        globalData.SetSpinnerVisible(false);
    }


    // Submit the record held in 'data' to the server
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        globalData.SetSpinnerVisible(true);

        await SafeFetch('api/SaveCustomerDetails', POST(data))
            .then((data) => {
                globalData.SetSpinnerVisible(false);

                if (data != null) {
                    const dialog = document.getElementById('customer_details_saved') as HTMLDialogElement;
                    dialog.showModal();
                }
        });
    }



    // Update the 'data' record held in the useState
    const updateData = (field: string, value: string | number | boolean) => {
        setData({ ...data, [field]: value });
    }



    return (
        <>
            <Modal id="customer_details_saved" title="Admin">
                Customer was not succesfully saved, but was passed to the server
            </Modal>

            <form onSubmit={handleSubmit} className="mx-auto my-10">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs p-4">
         
                    <h1>Customer Details</h1>
         
                    <div>
                        <Label title="Vehicle">{data?.vehicle || ""}</Label>

                        <div className="grid grid-cols-2 gap-8">
                            <div>

                                <Input value={data?.power || ""} type="text" title="Power" placeholder="Vehicle power" onChange={(e) => updateData('power', e.target.value)} />

                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mx-auto mt-4">Save</button>

                </fieldset>
            </form>


        </>
    );
}