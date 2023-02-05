import style from "./newbatch.module.css";
import { useContext, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import moment from "moment";
//components
import ReactDatePicker from "react-datepicker";
import { Button } from "@components/Elements/Buttons/Buttons";
import Divider from "@components/Elements/Divider";
//Assets
//API
import { postBatchFinal } from "@services/Api/batch.api";
//context
import { ManagedUI } from "@contexts/ManagedUI";
//import { GlobalContext } from "@contexts/GlobalData";

export default function ConfirmForm({ data }) {
    const Router = useRouter();
    const { setOpenModal, setModalComp } = useContext(ManagedUI);
    const [formData, setFormData] = useState({
        last_enrollment_date: "",
        capacity: data.capacity,
    });
    console.log("data", data);
    const batchFinalSave = async () => {
        let newdate = moment(formData.last_enrollment_date).format(
            "YYYY-MM-DD"
        );
        let requestBody = {
            ...data,
            last_enrollment_date: newdate,
            capacity: formData.capacity,
        };

        const CourseFlowResponse = await postBatchFinal(requestBody);
        
        if (CourseFlowResponse.status === 200) {
            setOpenModal(false);
            Router.push("/batch");
        }
    };
    return (
        <div className={style.confirmFormContainer}>
            <p>Create Batch</p>
            <div className={["input-box", style.Input].join(" ")}>
                <label>LAST ENROLLMENT</label>
                <ReactDatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={formData.last_enrollment_date}
                    placeholderText="Click to select a date"
                    onChange={(date) =>
                        setFormData({
                            ...formData,
                            last_enrollment_date: date,
                        })
                    }
                    className={
                        formData.last_enrollment_date.length === 0
                            ? "date-input date-placeholder"
                            : "date-input"
                    }
                    calendarClassName="date-calendar"
                />
            </div>
            <div className={["input-box", style.Input].join(" ")}>
                <label>CAPACITY</label>

                <input
                    type="text"
                    placeholder="Enter Capacity"
                    value={formData.capacity}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            capacity: event.target.value,
                        })
                    }
                />
            </div>
            <Divider length="100%" margin="1rem 0" />
            <div className={style.FormButtonControls}>
                <Button
                    text="CANCEL"
                    buttonType="tertiary"
                    buttonVariant="outlined"
                    onClick={() => setOpenModal(false)}
                    /* minWidth="10rem" */
                />
                <Button
                    buttonType="primary"
                    text="SAVE BATCH"
                    onClick={() => batchFinalSave()}
                    /*   minWidth="10rem" */
                />
            </div>
        </div>
    );
}
