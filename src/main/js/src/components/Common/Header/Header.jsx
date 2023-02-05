import React, { useContext, useState } from "react";
import Link from "next/link";
//import Image from "next/image";
import style from "./Header.module.css";
//components
import SearchBar from "@/components/Elements/SearchBar/SearchBar";
import { Button } from "@/components/Elements/Buttons/Buttons";
import UserDropdown from "./UserDropdown";
//Assets
import { GiHamburgerMenu } from "react-icons/gi";

//context

function Header() {
    return (
        <div className={style.headerContainer}>
            <span>
                <span>
                    <GiHamburgerMenu />
                </span>
                <div className={style.logo_container}>
                    <Link href="/" passHref>
                        Logo - AI Pedia
                    </Link>
                </div>
            </span>

            <span>
                <SearchBar />
            </span>
            <span>
                <Button text={"Sign In"} />
            </span>
        </div>
    );
}

export default Header;
