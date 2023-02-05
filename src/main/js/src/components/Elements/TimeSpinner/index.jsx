import style from "./timespinner.module.css";
import React, { useState } from "react";
export default function TimeSpinner({ value, setValue }) {
    const [counter, setCounter] = useState(value);
    function add15Minutes(time) {
        //base case
        if (time === "23:45") {
            setCounter("00:00");
            return;
        }
        let [hours, minutes] = time.split(":");
        minutes = parseInt(minutes, 10) + 15;
        hours = parseInt(hours, 10);
        if (minutes >= 60) {
            hours++;
            minutes -= 60;
        }
        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        setCounter(hours + ":" + minutes);
        setValue(hours + ":" + minutes);
    }
    function subract15Minutes(time) {
        //base case
        if (time === "00:00") {
            setCounter("23:45");
            return;
        }
        let [hours, minutes] = time.split(":");
        minutes = parseInt(minutes, 10) - 15;
        hours = parseInt(hours, 10);
        if (minutes < 0) {
            hours--;
            minutes += 60;
        }
        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        setCounter(hours + ":" + minutes);
        setValue(hours + ":" + minutes);
    }
    return (
        <div className={style.container}>
            <button
                className={style.btn}
                style={{ paddingBottom: "0.1rem" }}
                onClick={() => subract15Minutes(counter)}
            >
                -
            </button>
            <span className={style.text}>
                <p>{counter}</p>
            </span>
            <button className={style.btn} onClick={() => add15Minutes(counter)}>
                +
            </button>
        </div>
    );
}
