import type { ReactNode } from 'react';

export default function StatsItem({ children, title, footer, bodyClass = "", icon }:
    { children: ReactNode, title: string, footer: string, bodyClass?: string, icon?: ReactNode }) {
    return (
        <>
            <div className="inline-block text-left align-middle">
                <div className="text-xs">{title}</div>
                <div className={bodyClass + " text-2xl"}>{children}</div>
                <div className="text-xs">{footer}</div>
            </div>
            <div className="inline-block ps-2 text-left align-middle">
                {icon}
            </div>
        </>
    )
}