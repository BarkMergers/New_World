import { useState } from 'react';
import Label from '../../components/label/Label';
import Select from '../../components/select/Select';
import Input from '../../components/input/Input';
import Check from '../../components/check/Check';


export default function NewProduct() {

    type NewProductType = {
        tenant: string;
        firstname: string;
        lastname: string;
        role: string;
        agent: string;
        age: number;
        active: boolean;
    };

    //const globalData = useContext(UserContext);

    // Store the record loaded from the server
    const [data, setData] = useState<NewProductType>({ tenant: "NewWorld", firstname: "", lastname: "", role: "", agent: "", age: 0, active: false});

    const updateData = (field: string, value: string | number | boolean) => {
        setData({ ...data, [field]: value });
    }

    // Trigger the loading of the record when the component mounts
    //useEffect(() => {
    //    if (accounts.length == 1)
    //        getAgent();
    //}, [accounts]);

    // Load from the server - an Async function
    //const getAgent = async () => {
    //    globalData.SetSpinnerVisible(true);

    //    const data = await SafeFetchJson(`api/GetAgent/${accounts[0].username}`, GET());

    //    setData(data);

    //    globalData.SetSpinnerVisible(false);
    //}

    // Submit the record held in 'data' to the server
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        alert(JSON.stringify(data));
        event.preventDefault();
    }

    //    event.preventDefault();

    //    globalData.SetSpinnerVisible(true);

    //    await SafeFetch('api/SaveAgent', POST(data))
    //        .then((data) => {
    //            globalData.SetSpinnerVisible(false);

    //            if (data != null) {
    //                document.getElementById('my_save').showModal();
    //            }

    //        });
    //}

    // Update the 'data' record held in the useState


    const roleList = ["Admin", "Comms", "Dev", "Agent"];




    return (
        <>
            <form onSubmit={handleSubmit} className="mx-auto my-1 rounded-lg border bg-white p-2">
 
                        <span title="Username">{data?.agent || ""}</span>

                        <div className="grid grid-cols-2 gap-8">
                            <div>

                                <Label title="Tenant">{data?.tenant || ""}</Label>

                                <Input value={data?.firstname || ""} type="text" title="First Name" placeholder="Your first name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('firstname', e.target.value)} />

                                <Input value={data?.lastname || ""} type="text" title="Last Name" placeholder="Your last name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('lastname', e.target.value)} />

                            </div>

                            <div>
                                <Input value={data?.age || 0} type="number" title="Age" placeholder="How old are you" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('age', e.target.value)} />

                                <Select value={data?.role || ""} title="Role" data={roleList} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateData('role', e.target.value)} />

                                <Check value={data?.active || false} title="Active" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData('active', e.target.checked)} />
                            </div>
                        </div>
                  
                    <button type="submit" className="btn btn-secondary mx-auto mt-4">Save</button>
 
            </form>
        </>
    );
}