import type { ReactNode } from 'react';

export default function TableRow({ children, selected = false, onSelect, index, onViewClick, viewText = "View", onViewStyle = "standard" }:
    {
        children: ReactNode, selected?: boolean, onSelect?: (value1: boolean, value2: number) => void,
        index: number, onViewClick?: (value1: number) => void, viewText?: string, onViewStyle?: undefined | "standard" | "slim"
    }) {

    const showSelector = onSelect !== undefined;
    const showView = onViewClick !== undefined;

    let styler: string;
    switch (onViewStyle) {
        case "slim": styler = "btn btn-outline btn-info"; break;
        default: styler = "btn btn-primary"; break;
    }



    return (
        <tr key={index}>
            {showSelector && <td><input type="checkbox" name="itemSelector" className="h-5 w-5 align-middle" onChange={(e) => onSelect!(e.target.checked, index) } checked={selected}></input></td>}

            {children}

            {showView && <td className="w-1"><button onClick={() => onViewClick!(index)} className={styler} type="button">{viewText}</button></td>}
        </tr>
    )
}
