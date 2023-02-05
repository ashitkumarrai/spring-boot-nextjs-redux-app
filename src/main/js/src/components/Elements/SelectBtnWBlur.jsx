import React, { useRef, useState, useEffect } from "react";
import LocalStorageService from "../../services/LocalStorageHandler";

const localStorage = LocalStorageService.getService();
/* 
    Component - Select Element with custom styling
    Props - header(optional), options
 */

export default function SelectBtnWBlur({
    header,
    options,
    blurContent,
    setblurContent,
    setIndexOf
}) {
    const [isLoading, setLoading] = useState(true);
    const [style, setStyle] = useState('header-select')
    const blurring = (e) => {
        if (e.target) {
            // setblurContent((prev) => !prev);
            setStyle("header-select-active");
        }
    };
    const setIDofCompany = async (value)=>{

    }
    return (
        <select className={style} onClick={(e) => blurring(e)} onChange={()=> setIndexOf(value)}>
            {options.map((entry, k) => (
                <option key={k} value={k}>{entry}</option>
            ))}
        </select>
    );
}

SelectBtnWBlur.defaultProps = {
    dropdownHeader: "Company XZY",
    options: [
        {
            name: "company",
            id: 165252548183503,
            designation: "Manager",
            department: "Sales",
            email: null,
            password: null,
            emailNotificationEnabled: false,
            desktopNotificationEnabled: false,
        },
    ],
};
