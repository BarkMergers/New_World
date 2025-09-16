import { useState } from "react";
import { Table, TableRow } from "../../components";
import type { ColumnData } from "../../models/ColumnData";

import { useContext } from "react";
import type { GlobalData } from '../../models/GlobalData';
import { UserContext } from '../../helpers/globalData';

type LastResultType = {
    name: string,
    rate: number,
    team: string,
    selected: boolean;
}


export default function LastResults() {


    const globalData: GlobalData = useContext(UserContext);

    const columnData: ColumnData[] = 
    [
        { id: 0, active: true, name: "name", text: "Name", sortable: true },
        { id: 0, active: true, name: "rate", text: "Rate", sortable: true },
        { id: 0, active: true, name: "team", text: "Team", sortable: true }
    ]

    const [data, setData] = useState<LastResultType[]>([
        {
            name: "Bill",
            rate: 32,
            team: "Team A",
            selected: false
        },
        {
            name: "Eric",
            rate: 19,
            team: "Team B",
            selected: false
        },
        {
            name: "Iain",
            rate: 26,
            team: "Team C",
            selected: false
        }
    ]);

    const onSelect = (value: boolean, index: number) => {
        setData(prevItems =>
            prevItems.map((item: LastResultType, i: number) => ((i == index || index == -1) ? { ...item, selected: value } : item))
        );
    }



    const viewClick = (index: number) => {
        globalData.ShowMessage(JSON.stringify(data[index]), "Last Result Account", "success")
    }



    return (
        <>
            <div className="text-center">
                Last Results
            </div>
            <Table<LastResultType> tableData={data} columnData={columnData} onSelect={onSelect} onViewClick={viewClick}>
                {
                    data.map((item: LastResultType, index: number) =>
                        <TableRow key={`row${index}`} index={index} selected={item.selected} onSelect={onSelect} onViewClick={viewClick} onViewStyle="slim" >
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

