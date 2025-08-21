import { createContext } from "react";
import type { GlobalData } from "../models/GlobalData";

let eventProcessingIconTimeout: ReturnType<typeof setTimeout> | null = null;

const closeTimer = () => {
    const dialog = document.getElementById('eventProcessingIcon') as HTMLDialogElement;
    dialog.close();
    if (eventProcessingIconTimeout != null) {
        clearTimeout(eventProcessingIconTimeout);
        eventProcessingIconTimeout = null;
    }
}

export const globalData: GlobalData = {
    SetSpinnerVisible: (spinnerVisible: boolean) => {

        if (spinnerVisible) {
            eventProcessingIconTimeout = setTimeout(() => {
                const dialog = document.getElementById('eventProcessingIcon') as HTMLDialogElement;
                dialog.showModal();
            }, 750);

            setTimeout(closeTimer, 10000);
        }
        else {
            closeTimer();
        }
    }
}

export const UserContext = createContext<GlobalData>(globalData);