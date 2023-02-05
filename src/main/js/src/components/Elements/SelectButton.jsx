import React from "react";

/* 
    Component - Select Element with custom styling
    Props - header(optional), options
 */

function SelectButton({ header, options, setEndDate, endDate }) {
    return (
        <select
            className="custom-select"
            onChange={(e) =>setEndDate(e.target.value)}
        >
            {options.map((entry, k) => (
                <option key={k}>{entry}</option>
            ))}
        </select>
    );
}

SelectButton.defaultProps = {
    dropdownHeader: "Company XZY",
    options: ["Option 1", "Option 2", "Option 3"],
};
