import Panel from "../../../components/panel/Panel";

export default function Dashboard() {
    return (
        <>
            <div style={{ "display": "inline-flex", width: "100%" }}>
                <Panel>New Acounts</Panel>
                <Panel>Stale Leads</Panel>
                <Panel>Outcomes</Panel>
            </div>
        </>
    );
}