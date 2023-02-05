import style from "./Layout.module.css";
import { useContext, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Montserrat } from "@next/font/google";
const inter = Montserrat({ subsets: ["latin"] });
//import LocalStorageService from "@services/LocalStorageHandler";
//components
import LoadingScreen from "../../Elements/LoadingScreen";
import Header from "../Header/Header";
import Sidebar from "@components/Common/Sidebar/Sidebar";
//ASsets
import backgroundImage from "@public/bg.png";
//Contexts
import { GlobalContext } from "@contexts/GlobalData";
import { ManagedUI } from "@contexts/ManagedUI";
import Modal from "../Modal";
import SmBar from "../SMBar";

function Layout({ children }) {
    //const localStorage = LocalStorageService.getService();
    const router = useRouter();
    const { setIsAuth } = useContext(GlobalContext);
    const [isLoading, setLoading] = useState(true);
    const [showSidebar, setShowSidebar] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [modalComp, setModalComp] = useState(null);

    useEffect(() => {
        //const token = localStorage.getAccessToken();
        const token = "afaf";
        if (token == null) {
            /*  if (router.pathname === "/login") {
                setLoading(false);
            } else {
                router.push({
                    pathname: "/login",
                });
            } */
            setLoading(false);
        } else {
            setIsAuth({
                token: token,
            });
            setLoading(false);
        }
    }, [router]);
    const providerValues = useMemo(
        () => ({
            openModal,
            setOpenModal,
            showSidebar,
            setShowSidebar,
            modalComp,
            setModalComp,
        }),
        [openModal, showSidebar, modalComp]
    );
    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <div
            className={` ${
                router.pathname != "/login"
                    ? `${style.root} ${inter.className}`
                    : `${style.unroot} ${inter.className}`
            }`}
            /*  style={{ width: "100vw", height: "100vh" }} */
        >
            {router.pathname === "/login" ? (
                <div className="container">{children}</div>
            ) : (
                <ManagedUI.Provider value={providerValues}>
                    {openModal && (
                        <Modal setShowModal={() => {}}>{modalComp}</Modal>
                    )}
                    <Header />
                    <Sidebar />
                    <div className="container">{children}</div>
                    <SmBar />
                </ManagedUI.Provider>
            )}
            <div className={style.overlay}>
                <Image src={backgroundImage} alt="bg" fill />
            </div>
        </div>
    );
}

export default Layout;
