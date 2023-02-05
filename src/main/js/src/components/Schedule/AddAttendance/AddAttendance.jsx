import style from "./addattendance.module.css";
import { useContext, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
//components
import ReactDatePicker from "react-datepicker";
import { SelectForObjects } from "@components/Elements/SelectField/SelectField";
import { Button } from "@components/Elements/Buttons/Buttons";
//API
import { postMarkAttendance } from "@services/Api/scheduler.api";
//context
import { ManagedUI } from "@contexts/ManagedUI";
export default function AddAttendance({ data }) {
    const { setOpenModal } = useContext(ManagedUI);
    const [formData, setFormData] = useState({
        attendance: "",
    });
    console.log("data", data);
    //Handling api call
    const handleSubmit = async () => {
        let requestBody = {
            calendar_id: data.id,
            attendance: formData.attendance,
        };

        const res = await postMarkAttendance(requestBody);

        if (res.status === 200) {
            alert(res.data.message);
            setOpenModal(false);
        }
    };

    return (
        <form className={style.confirmFormContainer}>
            <p>Mark Attendance</p>
            <p>
                Class: <strong>{data.class_title}</strong>{" "}
            </p>
            <div className={["input-box", style.Input].join(" ")}>
                <label>Fill Attendance</label>
                <input
                    type="number"
                    placeholder="Enter Attendance"
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            attendance: event.target.value,
                        })
                    }
                    required={true}
                />
            </div>

            <div className={style.FormButtonControls}>
                <Button
                    text="CANCEL"
                    buttonType="tertiary"
                    buttonVariant="outlined"
                    onClick={() => setOpenModal(false)}
                />
                <Button
                    buttonType="secondary"
                    text="SUBMIT"
                    disabled={formData.attendance === "" ? true : false}
                    onClick={() => handleSubmit()}
                />
            </div>
        </form>
    );
}
