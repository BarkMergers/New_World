import { Table, TableRow } from '../../components'
import { useEffect, useState } from 'react';
import TableFilter from '../tableFilter/TableFilter';
import { useQuery } from '@tanstack/react-query';
import { SafeFetchJson, GET } from '../../helpers/fetch';
import type { AgentFilterOptions } from '../../models/AgentFilterOptions';
import type { AgentFilterValues } from '../../models/AgentFilterValues';
import ColumnEditor, { OpenColumnEditor, LoadColumnData, SaveColumnData } from '../columEditor/ColumnEditor';
import type { ColumnData } from '../../models/ColumnData';
import type { Agent } from '../../models/Agent';
import { useContext } from "react";
import type { GlobalData } from '../../models/GlobalData';
import { UserContext } from '../../helpers/globalData';
import type { SortData } from '../../models/SortData';
import { FaTrashAlt, FaPause, FaUserPlus, FaPlay } from 'react-icons/fa';
import ActionBar from '../actionBar/ActionBar';
import type { ActionData } from '../../models/ActionData';


export default function AgentTable() {


    const globalData: GlobalData = useContext(UserContext);

    const rawData = [{
        selected: true,
        name: "Hart Hagerty",
        job: "Zemlak, Daniel and Leannon",
        color: "Purple",
        age: 23,
        height: 76
    }, {
        selected: false,
        name: "Brice Swyre",
        job: "Wyman-Ledner",
        color: "Red",
        age: 45,
        height: 54
    }, {
        selected: false,
        name: "Marjy Frencz",
        job: "Rowe-Schoen",
        color: "Red",
        age: 56,
        height: 58
    }, {
        selected: false,
        name: "Yancy Tear",
        job: "Wyman-Ledner",
        color: "Green",
        age: 39,
        height: 74
    }, {
        selected: false,
        name: "Boar Greysom",
        job: "Wixman White",
        color: "Purple",
        age: 54,
        height: 34
    }];

    const [data, setData] = useState<Agent[]>(rawData);

    const onSelect = (value: boolean, index: number) => {
        setData(prevItems =>
            prevItems.map((item, i) => ((i == index || index == -1) ? { ...item, selected: value } : item))
        );
    }






    // Add sorting
    const [sortData, setSortData] = useState<SortData<Agent>>({ fieldName: "name", sortOrder: "ascending" });
    useEffect(() => {
        reloadData();
    }, [sortData])







    // Setup filter data
    const [filterOptions, setFilterOptions] = useState<AgentFilterOptions>({color: [], name: [], job: [] });
    useQuery({
        queryKey: ["filter"],
        queryFn: () => getCustomerFilter()
    });
    const getCustomerFilter = async () => {
        const data = await SafeFetchJson(`api/GetAgentFilter`, GET());
        setFilterOptions(data);
        return data;
    }




    const reloadData = () => {
        let output = Array.from(rawData);
        output = filterValues.color == "" ? output : output.filter(agent => agent.color == filterValues.color);
        output = filterValues.job == "" ? output : output.filter(agent => agent.job == filterValues.job);
        output = filterValues.name == "" ? output : output.filter(agent => agent.name == filterValues.name);

        const currentSort: SortData<Agent> = sortData;

        output.sort((a, b) => {
            const key = currentSort.fieldName;
            const valA = currentSort.sortOrder == "ascending" ? a[key] : b[key];
            const valB = currentSort.sortOrder == "ascending" ? b[key] : a[key];

            // If it's a string, use localeCompare
            if (typeof valA === 'string' && typeof valB === 'string') {
                return valA.localeCompare(valB);
            }

            // If it's a number/boolean, convert to number and subtract
            return Number(valA) - Number(valB);
        })

        setData(output);
    }
    const [filterValues, setFilterValues] = useState<AgentFilterValues>({ color: "", name: "", job: "" });
    useEffect(() => {
        reloadData();
    }, [filterValues])

    const applyFilter = (controlValue: string, name: string) => {
        setFilterValues({ ...filterValues, [name]: controlValue });
    }

    useEffect(() => {
        setColumnData(LoadColumnData("liststructure_myaccounts", resetList));
    }, []);
    const resetList = () => {
        return [
            { id: 0, active: true, name: "name", text: "Name", sortable: true },
            { id: 1, active: true, name: "job", text: "Job", sortable: true },
            { id: 2, active: true, name: "color", text: "Color", sortable: true },
            { id: 3, active: false, name: "height", text: "Height", sortable: false },
            { id: 4, active: false, name: "age", text: "Age", sortable: false },
        ]
    }
    const [columnData, setColumnData] = useState<ColumnData[]>(LoadColumnData("liststructure_myaccounts", resetList));

    useEffect(() => {
        SaveColumnData("liststructure_myaccounts", columnData);
    }, [columnData])

    const viewClick = (index: number) => {
        globalData.ShowMessage(JSON.stringify(data[index]), "Agent Table", "success")
    }


    const agentActions: ActionData[] = [

        {
            icon: <FaUserPlus className="inline" />,
            tooltip: "Create agent",
            action: () => {
                globalData.ShowMessage("Creating an agent is not implemented!", "Agent Table", "error")
            }
        },
        {
            icon: <FaTrashAlt className="inline" />,
            tooltip: "Remove agents",
            action: () => {
                let nameList = "";
                data.map((item) => {
                    if (item.selected) {
                        nameList += `, ${item.name}`;
                    }
                });
                if (nameList == "")
                    globalData.ShowMessage("No agents selected", "Agent Table", "warning")
                else {
                    globalData.ShowConfirmation("Remove selected agents?", "Agent Table", "question", async () => {
                        globalData.ShowMessage(`Deleting ${nameList.substring(2)}`, "Agent Table", "success")
                    });
                }
            }
        },
        {
            icon: <FaPause className="inline" />,
            tooltip: "Disable agents",
            action: () => {
                let nameList = "";
                data.map((item) => {
                    if (item.selected) {
                        nameList += `, ${item.name}`;
                    }
                });
                if (nameList == "") {
                    globalData.ShowMessage("No agents selected", "Agent Table", "warning")
                }
                else {
                    globalData.ShowConfirmation("Pause selected agents?", "Agent Table", "question", async () => {
                        globalData.ShowMessage(`Pausing ${nameList.substring(2)}`, "Agent Table", "success")
                    });
                }
            }
        },
        {
            icon: <FaPlay className="inline" />,
            tooltip: "Restart agents",
            action: () => {
                let nameList = "";
                data.map((item) => {
                    if (item.selected) {
                        nameList += `, ${item.name}`;
                    }
                });
                if (nameList == "") {
                    globalData.ShowMessage("No agents selected", "Agent Table", "warning")
                }
                else {
                    globalData.ShowConfirmation("Restart selected agents?", "Agent Table", "question", async () => {
                        setTimeout(() => globalData.ShowMessage(`Restarting ${nameList.substring(2)}`, "Agent Table", "success"));
                    });
                }
            }
        }
    ]

    return (
        <>
            <ColumnEditor columnData={columnData} setColumnData={setColumnData} resetColumnData={resetList}></ColumnEditor>

            <TableFilter applyFilter={applyFilter} filterData={filterOptions} onEditColumn={OpenColumnEditor}></TableFilter>

            <ActionBar actionData={agentActions}></ActionBar>

            <Table<Agent> tableData={data} columnData={columnData} onSelect={onSelect} onViewClick={viewClick} setSortData={setSortData} sortData={sortData}>
                {
                    data.map((item: Agent, index: number) =>
                        <TableRow key={`row${index}`} index={index} selected={item.selected} onSelect={onSelect} onViewClick={viewClick}>
                            {columnData != null && columnData.map((column: ColumnData, index: number) => {
                                if (column.active)
                                    return <td key={index}>{item[column.name as keyof typeof item]}</td>
                            })}
                        </TableRow>
                    )
                }
            </Table>
        </>
    )
}