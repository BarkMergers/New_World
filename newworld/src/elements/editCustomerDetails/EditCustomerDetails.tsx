import { Input, Label } from '../../components'
import { useState, useEffect } from 'react';
import { useContext } from "react";
import { UserContext } from '../../helpers/globalData';
import { SafeFetchJson, GET, SafeFetch, POST } from '../../helpers/fetch';
import type { Customer } from '../../models/Customer';
import Select from '../../components/select/Select';
import { useNavigate } from 'react-router-dom';



export default function EditCustomerDetails({ id }: {id : string | undefined }) {


    // Access global functions
    const globalData = useContext(UserContext);

    const navigate = useNavigate()

    // Store the record loaded from the server
    const [data, setData] = useState<Customer>({ id: 0, increasedate: "", power: 0, vehicle: "", age: 0, fineamount: 0, fineoperator: "", status: "", issuer: "" });


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
        globalData.ShowConfirmation("Are you sure you want to save this record?", "Customer Details", "question", async () => {
            await processSave();
        })
    }

    const processSave = async () => {

        globalData.SetSpinnerVisible(true);

        await SafeFetch('api/SaveCustomerDetails', POST(data))
            .then((data) => {
                globalData.SetSpinnerVisible(false);

                if (data != null) {
                    globalData.ShowMessage("Customer record has been updated", "Customer Details", "success");
                }
        });
    }



    // Update the 'data' record held in the useState
    const updateData = (field: string, value: string | number | boolean) => {
        setData({ ...data, [field]: value });
    }


    const leaveScreen = () => {
        navigate("/customer")
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="mx-auto my-10">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box m-auto w-xl p-4">
         
                    <h1>Customer Details</h1>
         
                    <div>
                        <Label title="Vehicle">{data?.vehicle || ""}</Label>

                        <div className="grid grid-cols-2 gap-8">

                            <div>
                                <Input value={data?.vehicle || ""} type="text" title="Vehicle" placeholder="reg" onChange={(e) => updateData('vehicle', e.target.value)} />

                                <Input value={data?.power || ""} type="number" title="Power" placeholder="Vehicle power" onChange={(e) => updateData('power', e.target.value)} />

                                <Input value={data?.increasedate || ""} type="datetime-local" title="Increase Date" onChange={(e) => updateData('increasedate', e.target.value)} />

                                <Input value={data?.fineoperator || ""} type="text" title="Fine Operator" placeholder="fineoperator" onChange={(e) => updateData('fineoperator', e.target.value)} />
                            </div>

                            <div>
                                <Input value={data?.fineamount || ""} type="number" title="Fine Amount" placeholder="fineamount" onChange={(e) => updateData('fineamount', e.target.value)} />

                                <Input value={data?.age || ""} type="number" title="Age" placeholder="Age" onChange={(e) => updateData('age', e.target.value)} />

                                <Select value={data?.issuer || ""} data={["External", "Internal"]} title="Issuer" onChange={(e) => updateData('issuer', e.target.value)} />

                                <Select value={data?.status || ""} data={["To load", "Complete", "Processing"]} title="Status" onChange={(e) => updateData('status', e.target.value)} />
                            </div>

                        </div>
                    </div>

                    <div className="m-auto">
                        <button type="submit" className="btn btn-primary mx-1 mt-4">Save</button>
                        <button type="button" onClick={leaveScreen} className="btn btn-secondary mx-1 mt-4">Back</button>
                    </div>

                </fieldset>
            </form>


        </>
    );
}