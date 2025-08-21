import type { ReactNode } from 'react';
import './NumberPlate.css';

export default function NumberPlate({ children }: { children: ReactNode }) {
    return (
        <span className="number-plate">{children}</span>
    );
}
