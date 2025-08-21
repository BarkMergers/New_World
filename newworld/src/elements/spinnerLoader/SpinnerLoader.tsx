import { useRef } from 'react'

export default function SpinnerLoader() {

    const modalRef = useRef(null);
    const id = "eventProcessingIcon";
    const handleESC = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        event.preventDefault();
    }

    return (
        <dialog ref={modalRef} id={id} className="modal" onCancel={handleESC}>
            <form method="dialog" className="modal-box">
                <h3 className="text-center text-lg font-bold">Processing</h3>
                <img style={{ "height": "150px", "width": "150px", "margin": "auto" }} src="./fade-stagger-squares.svg"></img>
            </form>
        </dialog>
    );
}

