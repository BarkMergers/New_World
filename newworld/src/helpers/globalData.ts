import { createContext } from "react";
import type { GlobalData } from "../models/GlobalData";
import modalError from '/modalerror.png'
import modalQuestion from '/modalquestion.png'
import modalSucess from '/modalsuccess.png'
import modalWarning from '/modalwarning.png'

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

    ShowMessage: (message: string, title: string, icon: "success" | "warning" | "question" | "error") => {
        const dialog = document.getElementById('generic_message_box') as HTMLDialogElement;

        dialog.querySelectorAll(".modal-title")[0].innerHTML = title;
        dialog.querySelectorAll(".modal-body")[0].innerHTML = message;

        const iconElement = dialog.querySelectorAll('.success-icon')[0] as HTMLImageElement;
        switch (icon) {
            case "question": iconElement.src = modalQuestion; break;
            case "success": iconElement.src = modalSucess; break;
            case "error": iconElement.src = modalError; break;
            case "warning": iconElement.src = modalWarning; break;
        }

        (dialog.querySelectorAll('.modal-ok')[0] as HTMLImageElement).style.display = "block";
        (dialog.querySelectorAll('.modal-cancel')[0] as HTMLImageElement).style.display = "none";
        (dialog.querySelectorAll('.modal-yes')[0] as HTMLImageElement).style.display = "none";
        (dialog.querySelectorAll('.modal-no')[0] as HTMLImageElement).style.display = "none";

        dialog.showModal();
    },


    ShowConfirmation: (message: string, title: string, icon: "success" | "warning" | "question" | "error", onContinue: () => void) => {
        const dialog = document.getElementById('generic_message_box') as HTMLDialogElement;

        dialog.querySelectorAll(".modal-title")[0].innerHTML = title;
        dialog.querySelectorAll(".modal-body")[0].innerHTML = message;

        const iconElement = dialog.querySelectorAll('.success-icon')[0] as HTMLImageElement;
        switch (icon) {
            case "question": iconElement.src = modalQuestion; break;
            case "success": iconElement.src = modalSucess; break;
            case "error": iconElement.src = modalError; break;
            case "warning": iconElement.src = modalWarning; break;
        }

        (dialog.querySelectorAll('.modal-ok')[0] as HTMLImageElement).style.display = "none";
        (dialog.querySelectorAll('.modal-cancel')[0] as HTMLImageElement).style.display = "none";
        (dialog.querySelectorAll('.modal-no')[0] as HTMLImageElement).style.display = "block";

        const yesButton = dialog.querySelectorAll('.modal-yes')[0] as HTMLImageElement;
        yesButton.style.display = "block";
        const continueFunction = () => {
            yesButton.removeEventListener("click", continueFunction, false);
            onContinue();
        }

        yesButton.addEventListener("click", continueFunction, false);

        dialog.showModal();
    },


    SetSpinnerVisible: (spinnerVisible: boolean) => {

        if (spinnerVisible && eventProcessingIconTimeout == null) {
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