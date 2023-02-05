import React, { useState, useRef, useEffect } from "react";
const timeline = ["1Y", "3Y", "5Y", "All"];
export default function TimelineControl({ options, selected, setselected }) {
    const [selectedOption, setSelectedOption] = useState(0);

    const onOptionClicked = (value, i) => {
        setSelectedOption(i);
        setselected(value);
    };
    return (
        <div className="timeline-control">
            <ul>
                {timeline.map((option, i) => (
                    <li
                        onClick={() => onOptionClicked(option, i)}
                        key={i}
                        className={selectedOption === i ? "active" : null}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}
