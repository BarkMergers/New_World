import Panel from "../../../components/panel/Panel";

export default function Dashboard() {
    return (
        <>
            <div className="flex w-full">
                <Panel>New Acounts</Panel>
                <Panel>Stale Leads</Panel>
                <Panel>Outcomes</Panel>
            </div>
        </>
    );
}