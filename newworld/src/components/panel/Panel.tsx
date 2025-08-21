import type { ReactNode } from 'react';
import './Panel.css'

export default function Panel({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="panel-border-outer">
                <div className="panel-border jaama-panel">
                    { children }
                </div>
            </div>
        </>    
    );
};