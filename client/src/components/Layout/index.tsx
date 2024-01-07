import { Outlet } from "react-router-dom";
import Header from "../Header";
import Modal from "../Modal";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Modal />
        </>
    )
}

export default Layout;