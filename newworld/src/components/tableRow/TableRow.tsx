import './TableRow.css';
import type { ReactNode } from 'react';

export default function TableRow({ children, selector = false, detail = false, selected = false, updater, index, detailClick }:
    { children: ReactNode, selector?: boolean, detail?: boolean, selected?: boolean, updater: (value1: boolean, value2: number) => void, index: number, detailClick?: (value1: number) => void }) {

    return (
        <tr key={index}>
            {selector && <td><input type="checkbox" name="itemSelector" className="h-5 w-5 align-middle" onChange={(e) => updater(e.target.checked, index) } checked={selected}></input></td>}

            {children}

            {detail && <td className="w-1"><button onClick={() => detailClick!(index)} className="btn btn-primary" type="button">Detail</button></td>}
        </tr>
    )
}
