import MyDetails from "../../../elements/myDetails/MyDetails";
import type { AccountInfo } from "@azure/msal-browser";

export default function Plain({ accounts }: { accounts: AccountInfo[] }) {
    return (
        <div className="overflow-auto">
            <MyDetails accounts={accounts}></MyDetails>
        </div>
    )
}