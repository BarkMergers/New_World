import type { ReactNode } from "react";

export type ActionData = {
    action: () => void;
    tooltip: string;
    icon: ReactNode;
};