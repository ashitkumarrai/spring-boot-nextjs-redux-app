import React, { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import style from "./InputField.module.css";

//Constants
const emailReg =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

/* 
-- Component : Input field with custom styling
-- Props : label, placeholder, type (input type), 
            padding (same as vanilla CSS, shorhand also valid) 
*/

function InputField({
    labelPosition,
    label,
    inputType,
    placeholder,
    value,
    setvalue,
    required,
    disabled,
    maxLen,
    padding,
    width,
    description,
}) {
    const [UI, setUI] = useState({
        displayError: null,
        errorMsg: "Email not registered",
    });

    return (
        <div
            className={`${style.container} ${style[labelPosition]} ${
                style[UI.displayError]
            }`}
        >
            <label>{label}</label>
            <input
                style={{ padding: padding }}
                type={inputType}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChangeHappens(e.target.value)}
                required={required}
                disabled={disabled}
                maxLength={maxLen}
            />
            {description != null && <p className={style.desc}>{description}</p>}

            {/*   {isPassword ? (
                <span
                    className="password-reveal"
                    onClick={() =>
                        setshowPassword((prevState) => !prevState)
                    }
                >
                    {showPassword ? <BsEye /> : <BsEyeSlash />}
                </span>
            ) : null} */}
        </div>
    );
}

InputField.defaultProps = {
    type: "text",
    label: "LABEL NAME",
    placeholder: "Enter Text",
    padding: "1rem",
    maxLen: 64,
    setvalue: (e) => {
        console.log(e);
    },
    description: null,
};
export default InputField;
