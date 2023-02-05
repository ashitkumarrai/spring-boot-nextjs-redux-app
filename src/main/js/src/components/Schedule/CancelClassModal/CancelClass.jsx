import style from "./cancelClass.module.css";
import { useContext, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
//components
import { SelectForObjects } from "@components/Elements/SelectField/SelectField";
import { Button } from "@components/Elements/Buttons/Buttons";
//API
import { postCancelClass, getClassReasons } from "@services/Api/scheduler.api";
//context
import { ManagedUI } from "@contexts/ManagedUI";
export default function CancelClass({ classData }) {
    const { setOpenModal } = useContext(ManagedUI);
    const [reasons, setReasons] = useState([]);
    const [formData, setFormData] = useState({
        reason: "",
        reason_id: null,
        comment: "",
    });

    //Fetching class reasons
    useEffect(() => {
        async function fetchClassReasons() {
            const res = await getClassReasons();

            if (res.status === 200) {
                setReasons([
                    ...res.data.data,
                    {
                        id: 0,
                        description: "Other Reason",
                    },
                ]);
            }
        }
        fetchClassReasons();
    }, []);
    //Handling cancel class
    const handleCancel = async () => {
        let requestBody = {
            id: classData.class_id,
        };
        if (formData.reason_id !== 0) {
            requestBody = {
                ...requestBody,
                cancellation_reason_id: formData.reason_id,
            };
        } else {
            requestBody = {
                ...requestBody,
                comment: formData.comment,
            };
        }

        const res = await postCancelClass(requestBody);

        if (res.status === 200) {
            alert("Class Cancelled");
            setOpenModal(false);
        }
    };

    return (
        <form className={style.confirmFormContainer}>
            <p>Cancel Class</p>
            <div className={["input-box", style.Input].join(" ")}>
                <label>Select Reason</label>
                <SelectForObjects
                    padding="0.8rem 1rem"
                    placeholder="Select Reason"
                    options={reasons}
                    optionName="description"
                    optionID="id"
                    selected={formData.reason}
                    setselected={(data, id) => {
                        setFormData({
                            ...formData,
                            reason_id: id,
                            reason: data,
                        });
                    }}
                />
            </div>
            {/* Conditional rendering of comment input field */}
            {formData.reason_id === 0 && (
                <div className={["input-box", style.Input].join(" ")}>
                    <label>Comment</label>
                    <input
                        type="text"
                        placeholder="Type reason for cancellation"
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                comment: event.target.value,
                            })
                        }
                        required={true}
                    />
                </div>
            )}

            <div className={style.FormButtonControls}>
                <Button
                    text="LEAVE"
                    buttonType="tertiary"
                    buttonVariant="outlined"
                    onClick={() => setOpenModal(false)}
                />
                <Button
                    buttonType="secondary"
                    text="CANCEL CLASS"
                    disabled={
                        formData.reason_id === null && formData.comment === ""
                            ? true
                            : false
                    }
                    onClick={() => handleCancel()}
                />
            </div>
        </form>
    );
}
