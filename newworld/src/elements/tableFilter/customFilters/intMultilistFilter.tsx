import { useState } from "react";
import type { FilterDefinition } from "../../../models/FilterDefinition";

export default function IntMultilistFilter({ value, applyFilter, filterKey }: { value: FilterDefinition, applyFilter: (value1: string, value2: string) => void, filterKey: string }) {

    const [label, setLabel] = useState<string>("");

    return (
        <div className="dropdown"

            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    const checkboxes = e.currentTarget.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
                    const checkedValues = Array.from(checkboxes)
                        .filter((c) => c.checked)
                        .map((c) => Number(c.value));
                    applyFilter(JSON.stringify(checkedValues), filterKey)
                    const labelText: string = checkedValues.join(", ");
                    setLabel(labelText == "" ? "" : `: ${labelText}`);
                }
            }}>

            <label className="btn btn-accent h-8 align-top" tabIndex={0}>
                <span className="filterDisplay">Filter {value.description}{label}</span>
            </label>

            <ul tabIndex={0} style={{ "zIndex": 100000 }} className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow">
                {value.intData?.map((i, ii) =>
                    <li key={ii} className="flex-row">
                        <span className="inline-block"><input value={i} className="h-5 w-5" type="checkbox" /></span>
                        <span className="inline-block">{i}</span>
                    </li>
                )}
            </ul>

        </div>
    )
}