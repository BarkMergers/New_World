import AgentTable from "../../../elements/agentTable/AgentTable";
import StatsBar from "../../../elements/statsBar/StatsBar";
import TitleBar from "../../../elements/titleBar/TitleBar";

export default function Home() {
    return (
        <>
            <TitleBar></TitleBar>

            <StatsBar></StatsBar>

            <AgentTable></AgentTable>
        </>
    )
}