import MyDetails from "../../../elements/myDetails/MyDetails";
import type { AccountInfo } from "@azure/msal-browser";

export default function Plain({ accounts }: { accounts: AccountInfo[] }) {
    return (
        <>
            <MyDetails accounts={accounts} ></MyDetails>
        </>
    )
}