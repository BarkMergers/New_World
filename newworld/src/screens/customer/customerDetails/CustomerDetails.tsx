import EditCustomerDetails from "../../../elements/editCustomerDetails/EditCustomerDetails";
import TitleBar from "../../../elements/titleBar/TitleBar";

import { useParams } from "react-router-dom";  // Link

export default function CustomerDetails() {

    const { id } = useParams();

    return (
        <>
            <TitleBar></TitleBar>

            <EditCustomerDetails id={id} ></EditCustomerDetails>

        </>
    );
}