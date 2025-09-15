import { useState } from "react";
import { Table, TableRow } from "../../components";
import type { ColumnData } from "../../models/ColumnData";


type LastResultType = {
    name: string,
    rate: number,
    team: string,
    selected: boolean;
}


export default function LastResults() {

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

    return (

        <Table<LastResultType> tableData={data} columnData={columnData} onSelect={onSelect}>
            {
                data.map((item: LastResultType, index: number) =>
                    <TableRow key={`row${index}`} index={index} selected={item.selected} onSelect={onSelect}>
                        {columnData != null && columnData.map((column: ColumnData, index: number) => {
                            if (column.active)
                                return <td key={index}>{item[column.name as keyof typeof item]}</td>
                        })}
                    </TableRow>
                )
            }
        </Table>

    )
}

