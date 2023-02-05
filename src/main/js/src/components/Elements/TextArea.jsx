import React, { useState } from "react";

/* 
-- Component : TextArea with custom styling
-- Props : label, placeholder, type (input type), 
            padding (same as vanilla CSS, shorhand also valid) 
*/

function TextArea(props) {
    const [lowerBound, setLowerBound] = useState(null);
    const [show, setShow] = useState(false);

  /*   const CalcChar = (e) => {
        let maxlength = e.target.maxLength;
        let currVal = e.target.value.length;
        setLowerBound(maxlength - currVal);

        setShow(true);
    };
    const showRemaining = () => {
        setShow(false);
    }; */
    return (
        <div className="input-box">
            <label>{props.label}</label>
            <textarea
                onChange={props.onChange}
              /*   onFocus={(e) => CalcChar(e)}
                onBlur={() => showRemaining()} */
                style={{ padding: props.padding }}
                name="textarea"
                placeholder={props.placeholder}
                required={props.required}
                maxLength={props.maxLen}
                disabled={props.disabled}
                value={props.value}
            ></textarea>
          {/*   {show ? (
                <p className="textarea-char">{lowerBound} Remaining</p>
            ) : null} */}
        </div>
    );
}

TextArea.defaultProps = {
    label: "Text Area",
    placeholder: "Enter Text",
    padding: "1rem",
    maxLen: 256,
    disabled: false,
    required: false,
};
export default TextArea;
