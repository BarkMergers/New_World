import MyDetails from "../../../elements/myDetails/MyDetails";
import TitleBar from "../../../elements/titleBar/TitleBar";
import type { AccountInfo } from "@azure/msal-browser";

export default function Plain({ accounts }: { accounts: AccountInfo[] }) {
    return (
        <>
            <TitleBar></TitleBar>

            <MyDetails accounts={accounts} ></MyDetails>
        </>
    )
}