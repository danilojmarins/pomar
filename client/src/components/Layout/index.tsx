import { Navigate, Outlet } from "react-router-dom";
import Header from "../Header";
import Modal from "../Modal";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Layout = () => {

    const { loggedin } = useContext(AuthContext);

    if (!loggedin) {
        return <Navigate to={'/login'} />
    }

    return (
        <>
            <Header />
            <Outlet />
            <Modal />
        </>
    )
}

export default Layout;