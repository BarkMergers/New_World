import EditCustomerDetails from "../../../elements/editCustomerDetails/EditCustomerDetails";

import { useParams } from "react-router-dom";  // Link

export default function CustomerDetails() {

    const { id } = useParams();

    return (
        <div className="overflow-auto">
            <EditCustomerDetails id={id}></EditCustomerDetails>
        </div>
    );
}