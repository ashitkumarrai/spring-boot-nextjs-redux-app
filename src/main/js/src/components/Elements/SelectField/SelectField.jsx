import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import style from "./SelectField.module.css";
//Assets
import { GrPowerReset } from "react-icons/gr";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
export function SimpleSelect({
    options,
    selected,
    setselected,
    activeOptionIndex,
    required,
    bgColor,
    color,
    padding,
    margin,
    label,
    placeholder,
    fontsize,
    disabled,
    minWidth,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const clickRef = useRef();
    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value, i) => {
        setSelectedOption(value);
        activeOptionIndex(i);
        setselected(value);
        setIsOpen(false);
    };
    const closeDropdown = (e) => {
        setIsOpen(false);
    };
    // Track events outside scope
    const clickOutside = (e) => {
        if (clickRef.current.contains(e.target)) {
            return;
        }
        // outside click
        setIsOpen(false);
    };
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", clickOutside);
        }
        setSelectedOption(selected);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [isOpen, selected]);

    return (
        <div
            className={
                disabled
                    ? `${style.dropdown} ${style.dropdownDisabled} `
                    : `${style.dropdown} `
            }
            style={{
                margin: margin,
                fontSize: fontsize,
                backgroundColor: bgColor,
                minWidth: minWidth,
            }}
            ref={clickRef}
            unselectable
        >
            <div
                onClick={disabled ? () => {} : toggling}
                style={{ padding: padding, color: color }}
                className={style.innerDiv}
            >
                <p>
                    {selected != undefined && selected.length != 0 ? (
                        selectedOption
                    ) : (
                        <p
                            className={style.placeholderText}
                            style={{ fontSize: fontsize, color: color }}
                        >
                            {" "}
                            {placeholder}
                        </p>
                    )}
                </p>
                {isOpen ? (
                    <IoMdArrowDropup color={color} />
                ) : (
                    <IoMdArrowDropdown color={color} />
                )}
            </div>{" "}
            {isOpen && (
                <ul onMouseLeave={() => closeDropdown()} className={style.ul}>
                    {options.map((option, i) => (
                        <li onClick={() => onOptionClicked(option, i)} key={i}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

SimpleSelect.defaultProps = {
    options: ["Option 1", "Option 1", "Option 1", "Long Item Labelsdjbfbh"],
    label: "Select Field",
    placeholder: "Select",
    padding: "0.35rem 1rem",
    fontsize: "0.875rem",
    activeOptionIndex: () => {},
    setselected: () => {},
    disabled: false,
};
export function SelectSubList({
    options,
    selected,
    setselected,
    bgColor,
    color,
    padding,
    margin,
    placeholder,
    fontsize,
    disabled,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [subOptionArray, setSubOptionArray] = useState([]);
    const clickRef = useRef();
    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value, i) => {
        setSelectedOption(value, subOptionArray);
        /*     activeOptionIndex(i); */
        setselected(value);
        /* setIsOpen(false); */

        setSubOptionArray([]);
    };
    const subOptionSelect = (event, option, suboption, index) => {
        event.stopPropagation();
        let tempSubOptionArray = subOptionArray;
        let foundSubOption = null;
        let foundIndex = null;
        for (let i = 0; i < tempSubOptionArray.length; i++) {
            if (tempSubOptionArray[i] === suboption) {
                foundSubOption = tempSubOptionArray[i];
                foundIndex = i;
            }
        }
        if (foundSubOption) {
            tempSubOptionArray.splice(foundIndex, 1);
            setSubOptionArray(tempSubOptionArray);
            setselected(option, tempSubOptionArray);
            setSelectedOption(option);
        } else {
            tempSubOptionArray.push(suboption);

            setSubOptionArray(tempSubOptionArray);
            setselected(option, tempSubOptionArray);
            setSelectedOption(option);
        }
    };
    const closeDropdown = (e) => {
        setIsOpen(false);
    };
    // Track events outside scope
    const clickOutside = (e) => {
        if (clickRef.current.contains(e.target)) {
            return;
        }
        // outside click
        setIsOpen(false);
    };
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", clickOutside);
        }
        setSelectedOption(selected);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [selectedOption, isOpen, selected]);
    return (
        <div
            className={
                disabled
                    ? `${style.dropdown} ${style.subOpdropdown} ${style.dropdownDisabled} `
                    : `${style.dropdown} ${style.subOpdropdown} `
            }
            style={{
                margin: margin,
                fontSize: fontsize,
                backgroundColor: bgColor,
            }}
            ref={clickRef}
            unselectable
        >
            <div
                onClick={disabled ? () => {} : toggling}
                style={{ padding: padding, color: color }}
                className={style.innerDiv}
            >
                <p>
                    {selected != undefined && selected.length != 0 ? (
                        selectedOption
                    ) : (
                        <p
                            className={style.placeholderText}
                            style={{ fontSize: fontsize, color: color }}
                        >
                            {" "}
                            {placeholder}
                        </p>
                    )}
                </p>
                {isOpen ? (
                    <IoMdArrowDropup color={color} />
                ) : (
                    <IoMdArrowDropdown color={color} />
                )}
            </div>{" "}
            {isOpen && (
                <ul onMouseLeave={() => closeDropdown()} className={style.ul}>
                    {options.map((option, i) => (
                        <li
                            onClick={() => onOptionClicked(option.option, i)}
                            key={i}
                            className={
                                selected != undefined &&
                                selectedOption.toLowerCase() ===
                                    option.option.toLowerCase()
                                    ? style.selected
                                    : null
                            }
                        >
                            <span>
                                {selected != undefined &&
                                selectedOption.toLowerCase() ===
                                    option.option.toLowerCase() ? (
                                    <MdRadioButtonChecked />
                                ) : (
                                    <MdRadioButtonUnchecked />
                                )}
                                {option.option}
                            </span>

                            {option.subOptions != null && (
                                <ul className={style.InnerUL}>
                                    {option.subOptions.map((subOp, k) => {
                                        let flag = false;
                                        for (
                                            let i = 0;
                                            i < subOptionArray.length;
                                            i++
                                        ) {
                                            if (subOptionArray[i] === subOp) {
                                                flag = true;
                                            }
                                        }
                                        return (
                                            <li
                                                key={k}
                                                className={style.subListItem}
                                                onClick={(event) =>
                                                    subOptionSelect(
                                                        event,
                                                        option.option,
                                                        subOp,
                                                        k
                                                    )
                                                }
                                            >
                                                {flag ? (
                                                    <RiCheckboxCircleFill color="var(--blue)" />
                                                ) : (
                                                    <RiCheckboxCircleFill color="var(--grey-1)" />
                                                )}
                                                {subOp}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

SelectSubList.defaultProps = {
    /* options: ["Option 1", "Option 3", "Option 2", "Long Item Labelsdjbfbh"], */
    options: [
        {
            option: "Option 1",
            subOptions: null,
        },
        {
            option: "Option 2",
            subOptions: ["Sub 1", "Sub 2", "Sub 3", "Sub 4", "Sub 5"],
        },
    ],
    label: "Select Field",
    placeholder: "Select",
    padding: "0.35rem 1rem",
    fontsize: "0.875rem",
    activeOptionIndex: () => {},
    setselected: () => {},
    disabled: false,
};

export function SelectForObjects({
    options,
    optionName,
    optionID,
    selected,
    setselected,
    activeOptionIndex,
    required,
    bgColor,
    color,
    padding,
    margin,
    label,
    placeholder,
    fontsize,
    disabled,
    minWidth,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const clickRef = useRef();
    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value, i) => {
        setSelectedOption(value[optionName]);
        activeOptionIndex(value[optionID]);
        setselected(value[optionName], value[optionID]);
        setIsOpen(false);
    };

    const closeDropdown = (e) => {
        setIsOpen(false);
    };
    // Track events outside scope
    const clickOutside = (e) => {
        if (clickRef.current.contains(e.target)) {
            return;
        }
        // outside click
        setIsOpen(false);
    };
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", clickOutside);
        }
        setSelectedOption(selected);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [isOpen, selected]);

    return (
        <div
            className={
                disabled
                    ? `${style.dropdown} ${style.dropdownDisabled} `
                    : `${style.dropdown} `
            }
            style={{
                margin: margin,
                fontSize: fontsize,
                backgroundColor: bgColor,
                minWidth: minWidth,
            }}
            ref={clickRef}
            unselectable
        >
            <div
                onClick={disabled ? () => {} : toggling}
                style={{ padding: padding, color: color }}
                className={style.innerDiv}
            >
                <p>
                    {selected != undefined && selected.length != 0 ? (
                        selectedOption
                    ) : (
                        <p
                            className={style.placeholderText}
                            style={{ fontSize: fontsize, color: color }}
                        >
                            {" "}
                            {placeholder}
                        </p>
                    )}
                </p>
                {isOpen ? (
                    <IoMdArrowDropup color={color} />
                ) : (
                    <IoMdArrowDropdown color={color} />
                )}
            </div>{" "}
            {isOpen && (
                <ul onMouseLeave={() => closeDropdown()} className={style.ul}>
                    {options.map((option, i) => (
                        <li onClick={() => onOptionClicked(option, i)} key={i}>
                            {option[optionName]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

SelectForObjects.defaultProps = {
    options: ["Option 1", "Option 1", "Option 1", "Long Item Labelsdjbfbh"],
    label: "Select Field",
    placeholder: "Select",
    padding: "0.35rem 1rem",
    fontsize: "0.875rem",
    activeOptionIndex: () => {},
    setselected: () => {},
    disabled: false,
};

/* Multiple Select Dropdown */
export function MultiSelect({
    options,
    optionName,
    optionID,
    selected,
    setselected,
    activeOptionIndex,
    required,
    bgColor,
    color,
    padding,
    margin,
    label,
    placeholder,
    fontsize,
    disabled,
    minWidth,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(selected);
    let selectedOptionsLength = selectedOption.length;
    const clickRef = useRef();
    const toggling = () => setIsOpen(!isOpen);
    const handleSelect = async (e, option) => {
        e.stopPropagation();

        const found = selectedOption.find(
            (s) => s[optionName] === option[optionName]
        );
        if (found) {
            const newSelected = selectedOption.filter(
                (s) => s[optionName] !== option[optionName]
            );
            setSelectedOption(newSelected);
            setselected(newSelected);

            return;
        }
        const newSelected = [...selectedOption, option];
        setSelectedOption(newSelected);
        setselected(newSelected);
    };

    const closeDropdown = (e) => {
        setIsOpen(false);
    };
    // Track events outside scope
    const clickOutside = (e) => {
        if (clickRef.current.contains(e.target)) {
            return;
        }
        // outside click
        setIsOpen(false);
    };
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", clickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [selectedOption, isOpen]);

    return (
        <div
            className={
                disabled
                    ? `${style.dropdown} ${style.dropdownDisabled} `
                    : `${style.dropdown} `
            }
            style={{
                margin: margin,
                fontSize: fontsize,
                backgroundColor: bgColor,
                minWidth: minWidth,
            }}
            ref={clickRef}
        >
            <div
                onClick={toggling}
                style={{ padding: padding, color: color }}
                className={style.innerDiv}
            >
                <div className={style.selectedOptionList}>
                    {selectedOption.length == 0 ? (
                        <p>{placeholder}</p>
                    ) : (
                        <p
                            title={
                                selectedOption[selectedOptionsLength - 1][
                                    optionName
                                ]
                            }
                        >
                            {
                                selectedOption[selectedOptionsLength - 1][
                                    optionName
                                ]
                            }{" "}
                            {selectedOptionsLength > 1 &&
                                `+ ${selectedOption.length - 1}`}
                        </p>
                    )}
                </div>
                <div className={style.selectedOptionList}>
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            setselected([]);
                            setSelectedOption([]);
                        }}
                    >
                        <MdOutlineClose />
                    </span>

                    <FaChevronDown />
                </div>
            </div>{" "}
            {isOpen && (
                <ul
                    onMouseLeave={() => closeDropdown()}
                    style={{
                        listStyle: "none",
                        padding: "0",
                    }}
                    className={style.ul}
                >
                    {options.map((option, index) => {
                        const isSelected = selectedOption.find(
                            (s) => s[optionName] === option[optionName]
                        );
                        return (
                            <li
                                onClick={(e) => handleSelect(e, option)}
                                key={index}
                            >
                                <div className={style.multiselectOption}>
                                    {isSelected ? (
                                        <p className={style.selectedText}>
                                            <RiCheckboxCircleFill color="var(--blue)" />
                                        </p>
                                    ) : (
                                        <p className={style.selectedText}>
                                            <RiCheckboxCircleFill />
                                        </p>
                                    )}
                                    <p className="m-0 dark:text-white">
                                        {option[optionName]}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

MultiSelect.defaultProps = {
    dropdownHeader: "Company XZY",
    options: ["Company JQL2", "Company AB", "Company 1"],
    label: "Select Field",
};

export function AdvanceSelect({
    options,
    optionName,
    optionID,
    selected,
    setselected,
    activeOptionIndex,
    required,
    bgColor,
    color,
    padding,
    margin,
    label,
    placeholder,
    fontsize,
    disabled,
    minWidth,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const clickRef = useRef();
    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value, i) => {
        setSelectedOption(value[optionName]);

        setselected(value);
        setIsOpen(false);
    };

    const closeDropdown = (e) => {
        setIsOpen(false);
    };
    // Track events outside scope
    const clickOutside = (e) => {
        if (clickRef.current.contains(e.target)) {
            return;
        }
        // outside click
        setIsOpen(false);
    };
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", clickOutside);
        }
        setSelectedOption(selected);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [isOpen, selected]);

    return (
        <div
            className={
                disabled
                    ? `${style.dropdown} ${style.dropdownDisabled} `
                    : `${style.dropdown} `
            }
            style={{
                margin: margin,
                fontSize: fontsize,
                backgroundColor: bgColor,
                minWidth: minWidth,
            }}
            ref={clickRef}
            unselectable
        >
            <div
                onClick={disabled ? () => {} : toggling}
                style={{ padding: padding, color: color }}
                className={style.innerDiv}
            >
                <p>
                    {selected != undefined && selected.length != 0 ? (
                        selectedOption
                    ) : (
                        <p
                            className={style.placeholderText}
                            style={{ fontSize: fontsize, color: color }}
                        >
                            {" "}
                            {placeholder}
                        </p>
                    )}
                </p>
                {isOpen ? (
                    <IoMdArrowDropup color={color} />
                ) : (
                    <IoMdArrowDropdown color={color} />
                )}
            </div>{" "}
            {isOpen && (
                <ul onMouseLeave={() => closeDropdown()} className={style.ul}>
                    {options.map((option, i) => (
                        <li onClick={() => onOptionClicked(option, i)} key={i}>
                            {option[optionName]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

SelectForObjects.defaultProps = {
    options: ["Option 1", "Option 1", "Option 1", "Long Item Labelsdjbfbh"],
    label: "Select Field",
    placeholder: "Select",
    padding: "0.35rem 1rem",
    fontsize: "0.875rem",
    activeOptionIndex: () => {},
    setselected: () => {},
    disabled: false,
};
