import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { VscError } from "react-icons/vsc";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { ModalContainer } from "./styles";

const Modal = () => {

    const {
        show, setShow,
        type,
        message
    } = useContext(ModalContext);

    if (show) {
        setTimeout(() => {
            setShow(false);
        }, 3000);
    }

    if (show) {
        return (
            <ModalContainer className={type}>
                <span>{type === 'error' ? <VscError /> : <IoIosCheckmarkCircleOutline />}</span>
                <p>{type === 'error' ? 'Erro: ' + message : 'Sucesso: ' + message}</p>
            </ModalContainer>
        )
    }

    return null;
}

export default Modal;