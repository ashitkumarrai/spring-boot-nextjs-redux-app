import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

/* const options = ["Company JQL","Company ABC", "Company 123"]; */
export default function Dropdown({ dropdownHeader, options }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Company");

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value)  => {
        setSelectedOption(value);
        setIsOpen(false);
        console.log(selectedOption);
    };

    return (
        <div className="dropdown-container"
            style={
                isOpen ? { backgroundColor: "#523BB0", color: "#fff" } : null
            }
        >
            <div onClick={toggling}>
                {selectedOption}{" "}
                <FaChevronDown stroke={isOpen ? "#fff" : null} />
            </div>{" "}
            
            {isOpen && (
                <ul >
                    {options.map((option, i) => (
                        <li onClick={() => onOptionClicked(option)} key={i}>
                            {option}
                            {/* {i == '0'? (<FaChevronDown stroke={isOpen?'#fff':null}/> ): null} */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

Dropdown.defaultProps = {
    dropdownHeader: "Company XZY",
    options: ["Company JQL", "Company ABC", "Company 123"],
};
