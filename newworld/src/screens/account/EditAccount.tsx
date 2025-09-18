import EditAccountDetails from "../../elements/editAccountDetails/EditAccountDetails";

import { useParams } from "react-router-dom";

export default function EditAccount() {

    const { id } = useParams();

    return (
        <>
            <div className="overflow-auto">
                <EditAccountDetails id={id}></EditAccountDetails>
            </div>
        </>
    );
}