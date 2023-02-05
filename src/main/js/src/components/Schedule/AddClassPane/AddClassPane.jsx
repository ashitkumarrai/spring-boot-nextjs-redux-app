import style from "./addclass.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import { useEffect, useState, useContext, useMemo } from "react";
//components
import SidePane from "@components/Elements/SidePane";
import ReactDatePicker from "react-datepicker";
import {
    SimpleSelect,
    SelectForObjects,
    AdvanceSelect,
} from "@components/Elements/SelectField/SelectField";
import { Button } from "@components/Elements/Buttons/Buttons";
import { MdArrowBack } from "react-icons/md";

//Assets

//context
import { ManagedUI } from "@contexts/ManagedUI";
import { GlobalContext } from "@contexts/GlobalData";
//API
import { getBatches, getBatchDetails } from "@services/Api/batch.api";
import { postAddClass, postEditClass } from "@services/Api/scheduler.api";
import { getMentorList } from "@services/Api/mentor.api";
import { getClassroomList } from "@services/Api/classroom.api";
import moment from "moment/moment";

export default function AddClassPane({ isEditMode, isExtendMode, data }) {
    const { setOpenModal } = useContext(ManagedUI);
    const { TimeArray } = useContext(GlobalContext);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [pageUI, setPageUI] = useState({
        mentorDisabled: true,
        subjectDisabled: true,
    });
    const [mainData, setMainData] = useState({
        mentorList: null,
    });
    const [formData, setFormData] = useState({
        selectedBatch: {
            batch_name: null,
            batch_id: null,
        },
        selectedMentor: {
            mentor_name: null,
            id: null,
        },
        selectedSubject: {
            subject_name: null,
            subject_id: null,
        },
        selectedClassroom: {
            classroom_name: null,
            id: null,
        },
        start_time: "",
        end_time: "",
        date: "",
        topic: "",
    });
    //Fetching Batches
    useEffect(() => {
        if (isEditMode || isExtendMode) {
            console.log("edit data", data);
            setFormData({
                ...formData,
                selectedBatch: {
                    batch_name: data.batch_name,
                    batch_id: data.batch_id,
                },
                selectedMentor: {
                    mentor_name: data.mentor_name,
                    id: data.mentor_id,
                },
                selectedSubject: {
                    subject_name: data.subject_name,
                    subject_id: data.subject_id,
                },
                selectedClassroom: {
                    classroom_name: data.classroom_name,
                    id: data.classroom_id,
                },
                start_time: data.start_time,
                end_time: data.end_time,
                date: new Date(data.calendar_date),
                topic: data.class_title,
                id: data.class_id,
            });
        }
        async function fetch() {
            const params = {
                status: "PUBLISHED",
            };
            const response = await getBatches(params);
            let batchList = [];
            let distinctSubjectsObj = [];
            let distinctSubjects = [];
            for (let i = 0; i < response.data.data.length; i++) {
                let batch = response.data.data[i].batches;
                for (let j = 0; j < batch.length; j++) {
                    batchList.push({
                        product: response.data.data[i].course_name,
                        batch_name: batch[j].batch_name,
                        batch_id: batch[j].id,
                        centre_id: batch[j].centre_id,
                    });

                    for (let k = 0; k < batch[j].batch_mentors.length; k++) {
                        if (
                            !distinctSubjects.includes(
                                batch[j].batch_mentors[k].subject_id
                            )
                        ) {
                            distinctSubjects.push(
                                batch[j].batch_mentors[k].subject_id
                            );
                            distinctSubjectsObj.push({
                                subject_name:
                                    batch[j].batch_mentors[k].subject_name,
                                subject_id:
                                    batch[j].batch_mentors[k].subject_id,
                            });
                        }
                    }
                }
            }
            // console.log("subject", distinctSubjectsObj);
            setMainData({
                ...mainData,
                batchList: batchList,
                subjectList: distinctSubjectsObj,
            });
            // console.log("baches fetched", response.data.data);
            // console.log("batch list", batchList);
            setLoading(false);
        }
        fetch();
    }, []);
    //Fetching Mentors
    useEffect(() => {
        async function fetch() {
            const params = {
                centre_id: formData.selectedBatch.centre_id,
            };
            const mentorResponse = await getMentorList(params);
            const response = await getClassroomList(params);
            let mentorList = [];
            for (let i = 0; i < mentorResponse.data.data.length; i++) {
                for (
                    let j = 0;
                    j < mentorResponse.data.data[i].subjects.length;
                    j++
                ) {
                    if (
                        mentorResponse.data.data[i].subjects[j].subject_name ===
                            formData.selectedSubject.subject_name &&
                        mentorResponse.data.data[i].subjects[j].product_name ===
                            formData.selectedBatch.product
                    ) {
                        mentorList.push(mentorResponse.data.data[i]);
                    }
                }
            }
            console.log("class", response.data.data);
            setMainData({
                ...mainData,
                mentorList: mentorList,
                classroomList: response.data.data,
            });
            setPageUI({
                ...pageUI,
                mentorDisabled: false,
            });
            setLoading(false);
        }
        if (formData.selectedSubject.subject_name !== null) {
            fetch();
        }
    }, [formData.selectedSubject.subject_name]);
    //Selecting Subject for corresponding mentor
    /*    useEffect(() => {
        if (
            formData.selectedMentor.id !== null &&
            mainData.mentorList !== null
        ) {
            let subject = {};

            for (let i = 0; i < mainData.mentorList.length; i++) {
                if (
                    mainData.mentorList[i].mentor_id ===
                    formData.selectedMentor.id
                ) {
                    subject = {
                        subject_name: mainData.mentorList[i].subject_name,
                        id: mainData.mentorList[i].subject_id,
                    };
                }
            }
            setFormData({
                ...formData,
                selectedSubject: subject,
            });
            setPageUI({
                ...pageUI,
                subjectDisabled: false,
            });
        }
    }, [formData.selectedMentor]); */

    //console.log("form data", formData);
    //console.log("main", mainData);
    // console.log("extend", isExtendMode);
    //add class
    const handleSubmit = async () => {
        let reqBody = {
            class_title: formData.topic,
            calendar_date: moment(formData.date).format("YYYY-MM-DD"),
            start_time: formData.start_time,
            end_time: formData.end_time,
            batch_id: formData.selectedBatch.batch_id,
            subject_id: formData.selectedSubject.subject_id,
            mentor_id: formData.selectedMentor.id,
            classroom_id: formData.selectedClassroom.id,
        };
        console.log("req", reqBody);
        const res = await postAddClass(reqBody);
        if (res.status == 200) {
            alert("Class Added Successfully");
            setOpenModal(false);
        }
        console.log(res);
    };
    //Editing Class
    const handleSaveChanges = async () => {
        let reqBody = {
            id: formData.id,
            class_title: formData.topic,
            calendar_date: moment(formData.date).format("YYYY-MM-DD"),
            start_time: formData.start_time,
            end_time: formData.end_time,
            batch_id: formData.selectedBatch.batch_id,
            subject_id: formData.selectedSubject.subject_id,
            mentor_id: formData.selectedMentor.id,
            classroom_id: formData.selectedClassroom.id,
        };
        console.log("req", reqBody);
        const res = await postEditClass(reqBody);
        if (res.status == 200) {
            alert("Class edited Successfully");
            setOpenModal(false);
        }
    };
    if (loading) return <div>Loading...</div>;
    return (
        <SidePane position="right" padding="0" width="28%">
            <div className={style.container}>
                {/* Header */}
                <span className={style.MentorHeader}>
                    <span onClick={() => setOpenModal(null)}>
                        <MdArrowBack />
                    </span>
                    {isEditMode === false && isExtendMode === false ? (
                        <p>Add Class</p>
                    ) : null}
                    {isEditMode && <p>Edit Class</p>}
                    {isExtendMode && <p>Extend Class</p>}
                </span>
                {/* Body */}
                <div className={style.Body}>
                    <div className={["input-box", style.Input].join(" ")}>
                        <label>DATE</label>
                        {isExtendMode ? (
                            <ReactDatePicker
                                dateFormat="dd-MMM-yyyy"
                                selected={formData.date}
                                placeholderText="Click to select a date"
                                onChange={(date) =>
                                    setFormData({
                                        ...formData,
                                        date: date,
                                    })
                                }
                                className={
                                    isExtendMode
                                        ? style.disabledDatePicker
                                        : "date-input"
                                }
                                calendarClassName="date-calendar"
                                disabled
                            />
                        ) : (
                            <ReactDatePicker
                                dateFormat="dd-MMM-yyyy"
                                selected={formData.date}
                                placeholderText="Click to select a date"
                                onChange={(date) =>
                                    setFormData({
                                        ...formData,
                                        date: date,
                                    })
                                }
                                className={
                                    formData.date.length === 0
                                        ? "date-input date-placeholder"
                                        : "date-input"
                                }
                                calendarClassName="date-calendar"
                            />
                        )}
                    </div>
                    {/* Batch Dropdown */}
                    <div className={["input-box", style.Input].join(" ")}>
                        <label>BATCH</label>
                        <AdvanceSelect
                            options={mainData.batchList}
                            optionName="batch_name"
                            optionID={"batch_id"}
                            selected={formData.selectedBatch.batch_name}
                            setselected={(data) => {
                                setFormData({
                                    ...formData,
                                    selectedBatch: data,
                                });
                            }}
                            padding="0.7rem 1rem"
                            placeholder="Select Batch"
                            disabled={isExtendMode}
                        />
                    </div>
                    {/* Subject Dropdown */}
                    <div className={["input-box", style.Input].join(" ")}>
                        <label>SUBJECT</label>
                        <SelectForObjects
                            options={mainData.subjectList}
                            optionName="subject_name"
                            optionID={"subject_id"}
                            selected={formData.selectedSubject.subject_name}
                            setselected={(data, id) => {
                                setFormData({
                                    ...formData,
                                    selectedSubject: {
                                        subject_name: data,
                                        subject_id: id,
                                    },
                                });
                            }}
                            padding="0.7rem 1rem"
                            placeholder="Select Subject"
                            disabled={isExtendMode}
                        />
                    </div>
                    {/* Mentor Dropdown */}
                    <div className={["input-box", style.Input].join(" ")}>
                        <label>MENTOR</label>
                        <SelectForObjects
                            options={mainData.mentorList}
                            optionName="mentor_name"
                            optionID={"id"}
                            selected={formData.selectedMentor.mentor_name}
                            setselected={(data, id) => {
                                setFormData({
                                    ...formData,
                                    selectedMentor: {
                                        mentor_name: data,
                                        id: id,
                                    },
                                });
                            }}
                            padding="0.7rem 1rem"
                            placeholder="Select Mentor"
                            disabled={pageUI.mentorDisabled || isExtendMode}
                        />
                    </div>

                    {/* Classroom Dropdown */}
                    <div className={["input-box", style.Input].join(" ")}>
                        <label>CLASSROOM</label>
                        <SelectForObjects
                            options={mainData.classroomList}
                            optionName="name"
                            optionID={"id"}
                            selected={formData.selectedClassroom.classroom_name}
                            setselected={(data, id) => {
                                setFormData({
                                    ...formData,
                                    selectedClassroom: {
                                        classroom_name: data,
                                        id: id,
                                    },
                                });
                            }}
                            padding="0.7rem 1rem"
                            placeholder="Select Classroom"
                            disabled={isExtendMode}
                        />
                    </div>
                    {/* Topic */}
                    <div className={["input-box", style.Input].join(" ")}>
                        <label>TOPIC</label>
                        <input
                            type="text"
                            placeholder="Enter Topic"
                            value={formData.topic}
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    topic: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className={["input-box", style.Input].join(" ")}>
                        <label>START TIME</label>
                        <SimpleSelect
                            options={TimeArray}
                            selected={formData.start_time}
                            setselected={(data) => {
                                setFormData({
                                    ...formData,
                                    start_time: data,
                                });
                            }}
                            padding="0.7rem 1rem"
                            placeholder="Start Time"
                            disabled={isExtendMode}
                        />
                    </div>
                    <div className={["input-box", style.Input].join(" ")}>
                        <label>END TIME</label>
                        <SimpleSelect
                            options={TimeArray}
                            selected={formData.end_time}
                            setselected={(data) => {
                                setFormData({
                                    ...formData,
                                    end_time: data,
                                });
                            }}
                            padding="0.7rem 1rem"
                            placeholder="End Time"
                            disabled={isExtendMode}
                        />
                    </div>
                </div>
                <div className={style.buttonControls}>
                    <Button
                        text="CANCEL"
                        buttonType="tertiary"
                        buttonVariant="outlined"
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        minWidth="10rem"
                    />
                    {isEditMode ? (
                        <Button
                            buttonType="primary"
                            text="SAVE CHANGES"
                            minWidth="10rem"
                            onClick={() => handleSaveChanges()}
                        />
                    ) : (
                        <Button
                            buttonType="secondary"
                            text="ADD CLASS"
                            minWidth="10rem"
                            onClick={() => handleSubmit()}
                        />
                    )}
                </div>
            </div>
        </SidePane>
    );
}
AddClassPane.defaultProps = {
    isEditMode: false,
};
