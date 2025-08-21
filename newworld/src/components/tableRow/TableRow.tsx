import type { ReactNode } from 'react';

export default function TableRow({ children, selected = false, onSelect, index, onDetailClick }:
    { children: ReactNode, selected?: boolean, onSelect?: (value1: boolean, value2: number) => void, index: number, onDetailClick?: (value1: number) => void }) {

    const showSelector = onSelect !== undefined;
    const showDetail = onDetailClick !== undefined;

    return (
        <tr key={index}>
            {showSelector && <td><input type="checkbox" name="itemSelector" className="h-5 w-5 align-middle" onChange={(e) => onSelect!(e.target.checked, index) } checked={selected}></input></td>}

            {children}

            {showDetail && <td className="w-1"><button onClick={() => onDetailClick!(index)} className="btn btn-primary" type="button">Detail</button></td>}
        </tr>
    )
}
