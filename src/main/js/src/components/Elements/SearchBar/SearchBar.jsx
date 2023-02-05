import React from "react";
import style from "./searchbar.module.css";
import { IoMdSearch } from "react-icons/io";
/* 
Search component */
export default function SearchBar({ placeholder, fn, width }) {
    let styles = {
        width: width,
    };
    return (
        <div className={style.searchbar} style={styles}>
            <input
                placeholder={placeholder}
                onChange={(e) => {
                    if (
                        e.target.value.length > 2 ||
                        e.target.value.length === 0
                    ) {
                        fn(e.target.value);
                    }
                }}
            />
            <IoMdSearch />
        </div>
    );
}
SearchBar.defaultProps = {
    placeholder: "Search",
    fn: (e) => {
        console.log(e);
    },
};
