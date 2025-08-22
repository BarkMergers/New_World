import type { ReactNode } from 'react';

export default function TableRow({ children, selected = false, onSelect, index, onViewClick, viewText = "View" }:
    { children: ReactNode, selected?: boolean, onSelect?: (value1: boolean, value2: number) => void, index: number, onViewClick?: (value1: number) => void, viewText?: string}) {

    const showSelector = onSelect !== undefined;
    const showView = onViewClick !== undefined;

    return (
        <tr key={index}>
            {showSelector && <td><input type="checkbox" name="itemSelector" className="h-5 w-5 align-middle" onChange={(e) => onSelect!(e.target.checked, index) } checked={selected}></input></td>}

            {children}

            {showView && <td className="w-1"><button onClick={() => onViewClick!(index)} className="btn btn-primary" type="button">{viewText}</button></td>}
        </tr>
    )
}
