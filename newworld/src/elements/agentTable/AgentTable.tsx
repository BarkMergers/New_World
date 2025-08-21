//import type { ReactNode } from 'react';
import Table from '../../components/table/Table'
import TableRow from '../../components/tableRow/TableRow';
import { useEffect, useState } from 'react';
import TableFilter from '../tableFilter/TableFilter';
import { useQuery } from '@tanstack/react-query';
import { SafeFetchJson, GET } from '../../helpers/fetch';
import type { AgentFilterOptions } from '../../models/AgentFilterOptions';
import type { AgentFilterValues } from '../../models/AgentFilterValues';
import ColumnEditor from '../columEditor/ColumnEditor';
import type { ColumnData } from '../../models/ColumnData';
import type { Agent } from '../../models/Agent';
import Modal from '../../components/modal/Modal';

import { useContext } from "react";
import type { GlobalData } from '../../models/GlobalData';
import { UserContext } from '../../helpers/globalData';

export default function AgentTable() {

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

    const showSelector = true;
    const showDetail = true;

    const globalData: GlobalData = useContext(UserContext);

    const updater = (value: boolean, index: number) => {
        setData(prevItems =>
            prevItems.map((item, i) => ((i == index || index == -1) ? { ...item, selected: value } : item))
        );
    }














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
        setData(output);
    }
    const [filterValues, setFilterValues] = useState<AgentFilterValues>({ color: "", name: "", job: "" });
    useEffect(() => {
        reloadData();
    }, [filterValues])

    const applyFilter = (controlValue: string, name: string) => {
        setFilterValues({ ...filterValues, [name]: controlValue });
    }




    const loadData = (): ColumnData[] => {
        try {
            const rawStorageData: string | null = localStorage.getItem("liststructure_myaccounts")
            if (rawStorageData == null || rawStorageData == "" || rawStorageData == "[]" || rawStorageData == "null") {
                return resetList();
            }
            else {
                return JSON.parse(rawStorageData!);
            }
        }
        catch {
            return resetList();
        }
    }
    useEffect(() => {
        setColumnData(loadData());
    }, []);
    const resetList = () => {
        return [
            { id: 0, active: true, name: "name", text: "Name" },
            { id: 1, active: true, name: "job", text: "Job" },
            { id: 2, active: true, name: "color", text: "Color" },
            { id: 3, active: false, name: "height", text: "Height" },
            { id: 4, active: false, name: "age", text: "Age" },
        ]
    }
    const [columnData, setColumnData] = useState<ColumnData[]>(loadData());
    const getHeader = () => {
        return columnData != null && columnData.map((column: ColumnData) => { return column.active && <td>{column.text}</td> });
    }
    useEffect(() => {
        if (columnData == null) {
            localStorage.removeItem("liststructure_myaccounts");
        }
        else {
            localStorage.setItem("liststructure_myaccounts", JSON.stringify(columnData));
        }
    }, [columnData])






    const [detailData, setDetailData] = useState<string>("");



    const detailClick = (index: number) => {

        globalData.SetSpinnerVisible(true);

        setDetailData(JSON.stringify(data[index]));
        const dialog = document.getElementById('show_agent') as HTMLDialogElement;
        dialog.showModal();
    }




    const openEditor = () => {
        const dialog = document.getElementById('dialog_tableEditor') as HTMLDialogElement;
        dialog.showModal();
    }




    return (
        <>

            <Modal id="show_agent" title="Agent Details">
                {detailData}
            </Modal>

            <ColumnEditor columnData={columnData} setColumnData={setColumnData} resetColumnData={resetList}></ColumnEditor>

            <TableFilter openEditor={openEditor} applyFilter={applyFilter} filterData={filterOptions}></TableFilter>

            <Table tableData={data} selector={showSelector} detail={showDetail} header={getHeader()} updater={updater}>
                {
                    data.map((item: Agent, index: number) =>
                        <TableRow selector={showSelector} updater={updater} detail={showDetail} selected={item.selected} index={index} detailClick={detailClick}>
                            {columnData != null && columnData.map((column: ColumnData) => {
                                if (column.active)
                                    return <td>{item[column.name as keyof typeof item]}</td>
                            })}
                        </TableRow>
                    )
                }
            </Table>



        </>
    )
}