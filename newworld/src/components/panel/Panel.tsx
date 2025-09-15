import type { ReactNode } from 'react';
import './Panel.css'

export default function Panel({ children, span = 0 }: { children: ReactNode, span?: number }) {



    const customStyle: object = {
       "gridColumn": span == undefined ? "span 1" : `span ${span}`
    }



    return (
        <>
            <div className="card card-border bg-base-200 text-base-content p-5" style={customStyle}>
                { children }
            </div>
        </>    
    );
};