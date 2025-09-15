import { Panel } from "../../../components";
import { CustomerRatings, LastResults, SalesRatios } from "../../../dashboardElements";



const Dashboard: React.FC = () => {

    const gridLayout = {
        "gridTemplateColumns": "repeat(auto-fit, minmax(300px, 1fr))",
        "gridAutoRows": "300px"
    }

    return (
        <div className="grid gap-3 py-2" style={gridLayout}>

            <Panel span={2}>
                <SalesRatios></SalesRatios>
            </Panel>

            <Panel>
                <CustomerRatings></CustomerRatings>
            </Panel>

            <Panel>
                <CustomerRatings></CustomerRatings>
            </Panel>

            <Panel span={2} >
                <LastResults></LastResults>
            </Panel>


        </div>
    );
};

export default Dashboard;