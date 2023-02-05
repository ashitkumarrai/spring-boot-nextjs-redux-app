import style from "./addleave.module.css";
import { useContext, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
//components
import ReactDatePicker from "react-datepicker";
import { SelectForObjects } from "@components/Elements/SelectField/SelectField";
import { Button } from "@components/Elements/Buttons/Buttons";
//API
import { postMarkLeave } from "@services/Api/scheduler.api";
//context
import { ManagedUI } from "@contexts/ManagedUI";
export default function AddLeave({ data }) {
    const { setOpenModal } = useContext(ManagedUI);
    const [formData, setFormData] = useState({
        calendar_date: "",
    });

    //Handling cancel class
    const handleSubmit = async () => {
        let newdate = moment(formData.calendar_date).format(
            "YYYY-MM-DD"
        );
        let requestBody = {
            calendar_date: newdate,
            type: "MENTOR",
            mentor_id: data.id,
        };

        const res = await postMarkLeave(requestBody);

        if (res.status === 200) {
            alert("Leave Added");
            setOpenModal(false);
        }
    };

    return (
        <form className={style.confirmFormContainer}>
            <p>Add Leave</p>
            <p>
                Mentor: <strong>{data.mentor_name}</strong>{" "}
            </p>
            <div className={["input-box", style.Input].join(" ")}>
                <label>Select Date</label>
                <ReactDatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={formData.calendar_date}
                    placeholderText="Click to select a date"
                    onChange={(date) =>
                        setFormData({
                            ...formData,
                            calendar_date: date,
                        })
                    }
                    className={
                        formData.calendar_date.length === 0
                            ? "date-input date-placeholder"
                            : "date-input"
                    }
                    calendarClassName="date-calendar"
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
                    text="ADD LEAVE"
                    disabled={formData.calendar_date === "" ? true : false}
                    onClick={() => handleSubmit()}
                />
            </div>
        </form>
    );
}
