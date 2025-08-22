import { useRef, type ReactNode } from 'react'
import modalSucess from '/modalsuccess.png'

export default function Modal({ id, title, children, onClose }:
    { id: string, title: string, children: ReactNode, onClose?: () => void }) {

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

                <div>
                    <img className="success-icon m-auto h-[100px] pt-5" src={ modalSucess } />
                </div>

                <h3 className="modal-title p-2 text-center text-lg font-bold">{title}</h3>

                <span className="modal-body">{children}</span>

                <div className="modal-action" style={{ justifyContent: "center", paddingTop: "20px" }} >
                    <button type="submit" className="btn btn-primary modal-ok" onClick={handleClose}>Ok</button>
                    <button className="btn btn-secondary modal-cancel hidden" onClick={handleClose}>Cancel</button>
                    <button className="btn btn-primary modal-yes hidden" onClick={handleClose}>Yes</button>
                    <button className="btn btn-secondary modal-no hidden" onClick={handleClose}>No</button>
                </div>

            </form>
        </dialog>
    );
}