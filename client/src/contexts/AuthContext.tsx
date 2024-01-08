import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface AuthContextTypes {
    loggedin: boolean;
}

export const AuthContext = createContext<AuthContextTypes>({} as AuthContextTypes);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {

    const [loggedin, setLoggedin] = useState<boolean>(true);

    useEffect(() => {
        api.post('/users/post/sessionStatus')
        .then((response) => {
            if (response.data.status === 'success') {
                setLoggedin(true);
            }
            else {
                setLoggedin(false);
            }
        })
        .catch(() => {
            setLoggedin(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ loggedin }}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;