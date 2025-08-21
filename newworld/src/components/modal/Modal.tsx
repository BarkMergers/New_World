import { useRef, type ReactNode } from 'react'

export default function Modal({ id, title, children, onClose, buttons }:
    { id: string, title: string, children: ReactNode, onClose?: () => void, buttons?: string }) {

    const modalRef = useRef(null);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    }

    const handleESC = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        event.preventDefault();
        handleClose();
    }

    return (
        <dialog ref={modalRef} id={id} className="modal" onCancel={handleESC}>
            <form method="dialog" className="modal-box text-center">
                <h3 className="p-2 text-center text-lg font-bold">{title}</h3>
                {children}

                {(typeof buttons == "undefined" || buttons == "") &&
                    <div className="modal-action" style={{ justifyContent: "center", paddingTop: "20px" }} >
                        <button className="btn" onClick={handleClose}>Close</button>
                    </div>
                }

                {buttons == "save" &&
                    <div className="modal-action" style={{ justifyContent: "center", paddingTop: "20px" }} >
                        <button type="submit" className="btn" onClick={handleClose}>Save</button>
                        <button className="btn" onClick={handleClose}>Cancel</button>
                    </div>
                }

            </form>
        </dialog>
    );
}