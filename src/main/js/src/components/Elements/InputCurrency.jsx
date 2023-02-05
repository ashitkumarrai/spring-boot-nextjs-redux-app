import CurrencyInput from "react-currency-input-field";
import React, { useState } from "react";

/* 
-- Component : Input field with custom styling
-- Props : label, placeholder, type (input type), 
            padding (same as vanilla CSS, shorhand also valid) 
*/

function InputCurrency(props) {
    return (
        <div className="input-box">
            <label>{props.label}</label>
            <CurrencyInput
                style={{ padding: props.padding }}
                required={props.required}
                placeholder={props.placeholder}
                value={props.value}
                decimalsLimit={2}
                prefix="$"
                onValueChange={(value) => props.setvalue(value)}
            />
        </div>
    );
}
InputCurrency.defaultProps = {
    label: "Number Field",
    placeholder: "Enter numbers",
    padding: "1rem",
};

export default InputCurrency;
