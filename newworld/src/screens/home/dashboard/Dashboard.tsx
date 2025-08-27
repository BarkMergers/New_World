import Panel from "../../../components/panel/Panel";
import TitleBar from "../../../elements/titleBar/TitleBar";

export default function Dashboard() {
    return (
        <>
            <TitleBar></TitleBar>

            <div className="flex w-full">
                <Panel>New Acounts</Panel>
                <Panel>Stale Leads</Panel>
                <Panel>Outcomes</Panel>
            </div>
        </>
    );
}