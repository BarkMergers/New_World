import type { ActionData } from "../../models/ActionData";

export default function ActionBar({ actionData }: { actionData: ActionData[] }) {
    return (
        <div className="card card-border bg-base-200 text-base-content my-1 text-right">
            <div className="card-body flex-row self-end px-1 py-1">
                {
                    actionData.map((item) => {
                        return <button onClick={ item.action } className="btn" title={ item.tooltip }>{ item.icon }</button>
                    })
                }
            </div>
        </div>
    );
}