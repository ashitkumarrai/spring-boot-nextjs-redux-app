import style from "./compare.module.css";
import { useEffect, useState, useContext } from "react";
//components
import SidePane from "@components/Elements/SidePane";
import Dropdown from "@components/Elements/Dropdown";
import { Button } from "@components/Elements/Buttons/Buttons";
import { BatchCard } from "@components/Elements/Cards";
//Assets
import { MdModeEdit, MdOutlineClear } from "react-icons/md";
import { GoCheck } from "react-icons/go";
//context
import { ManagedUI } from "@contexts/ManagedUI";

export default function CompareBatch() {
    const { setOpenModal } = useContext(ManagedUI);
    const [isEditMode, setEditMode] = useState(false);
    const [tempRow, setTempRow] = useState([
        {
            name: "Verbal",
            status: "Offline",
        },
        { name: "Quant", status: "Online" },
        { name: "Verbal", status: "Offline" },
    ]);
    return (
        <div className={style.SuperContainer}>
            <div className={style.container}>
                <div className={style.cards}></div>
                <div className={style.controls}>
                    <Button text="Cancel" theme="light" />
                    <Button text="Share" theme="dark" />
                </div>
            </div>
        </div>
    );
}

