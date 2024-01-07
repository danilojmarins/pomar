import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

interface ModalContextTypes {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    type: 'error' | 'success';
    setType: Dispatch<SetStateAction<'error' | 'success'>>;
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
}

export const ModalContext = createContext<ModalContextTypes>({} as ModalContextTypes);

interface ModalProviderProps {
    children: ReactNode;
}

const ModalProvider = ({ children }: ModalProviderProps) => {
    
    const [show, setShow] = useState<boolean>(false);
    const [type, setType] = useState<'error' | 'success'>('success');
    const [message, setMessage] = useState<string>('');

    return (
        <ModalContext.Provider value={{ show, setShow, type, setType, message, setMessage }}>
            { children }
        </ModalContext.Provider>
    )

}

export default ModalProvider;