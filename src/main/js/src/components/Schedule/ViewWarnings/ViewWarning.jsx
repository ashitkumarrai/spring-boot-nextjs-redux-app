import style from "./viewwarning.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState, useContext } from "react";
import moment from "moment";
//components
import SidePane from "@components/Elements/SidePane";
import ReactDatePicker from "react-datepicker";
import { MultiSelect } from "@components/Elements/SelectField/SelectField";
import Divider from "@components/Elements/Divider";
import { MdClose, MdOutlineBorderColor } from "react-icons/md";
import Avatar from "@components/Elements/Avatar";
import AddClassPane from "../AddClassPane/AddClassPane";
//Assets
import OfflineIcon from "@public/Assets/offline_course.svg";
import OnlineIcon from "@public/Assets/online_course.svg";
//context
import { ManagedUI } from "@contexts/ManagedUI";
//API
import { getConflictList, getWarnings } from "@services/Api/scheduler.api";

export default function ViewWarnings(props) {
    const [conflictLoading, setConflictLoading] = useState(true);
    const [data, setData] = useState([]);
    const { setOpenModal } = useContext(ManagedUI);
    const masterData = {
        conflicts: [
            { conflict_name: "BATCH", id: "BATCH" },
            { conflict_name: "CLASSROOM", id: "CLASSROOM" },
            ,
            { conflict_name: "MENTOR", id: "MENTOR" },
        ],
    };
    const [pageUI, setPageUI] = useState({
        type: [],
        start_date: props.fromDate,
        end_date: props.toDate,
    });

    //Schedule Conflict Data API Call
    useEffect(() => {
        async function fetch() {
            //Formatting Types
            let types = [];
            for (let i = 0; i < pageUI.type.length; i++) {
                types.push(pageUI.type[i].id);
            }

            let reqBody = {
                ...pageUI,
                start_date:
                    pageUI.start_date != ""
                        ? moment(pageUI.start_date).format("YYYY-MM-DD")
                        : "",
                end_date:
                    pageUI.end_date != ""
                        ? moment(pageUI.end_date).format("YYYY-MM-DD")
                        : "",
                type: types,
            };

            // get conflict list
            //console.log("Fetching....");
            const conflicts = await getWarnings(reqBody);
            console.log("war", conflicts.data.data);
            setData(conflicts.data.data);

            setConflictLoading(false);
        }

        fetch();
    }, [pageUI]);
    console.log("page", pageUI);
    return (
        <SidePane position="right" padding="0" width="28%">
            <div className={style.container}>
                {/* Header */}
                <span className={style.MentorHeader}>
                    <p>Warnings</p>
                    <Divider isVertical={true} length="1rem" />

                    {/* Warning dropdown */}
                    <MultiSelect
                        options={masterData.conflicts}
                        optionName="conflict_name"
                        optionID="id"
                        setselected={(entry) => {
                            setPageUI({
                                ...pageUI,
                                type: entry,
                            });
                            setConflictLoading(true);
                        }}
                        selected={pageUI.type}
                        placeholder="All Warnings "
                        fontsize="0.75rem"
                        margin="0.09rem 0.25rem "
                        padding="0.35rem 1rem"
                    />

                    <div
                        className={style.closeIcon}
                        onClick={() => {
                            setOpenModal(null);
                        }}
                    >
                        <MdClose />
                    </div>
                </span>

                <span className={style.MentorSubHeader}>
                    <p>From</p>
                    {/* <span className={style.MentorHeader} style={{color:"#0481FE",fontWeight: "600"}}><MdCalendarToday  size={16}/>{startDate}</span> */}
                    <div style={{ width: "10rem" }}>
                        <ReactDatePicker
                            dateFormat="dd-MMM-yyyy"
                            selected={pageUI.start_date}
                            placeholderText="Click to select a date"
                            onChange={(date) => {
                                setPageUI({
                                    ...pageUI,
                                    start_date: date,
                                });
                                setConflictLoading(true);
                            }}
                            className={
                                pageUI.start_date === null ||
                                pageUI.start_date.length === 0
                                    ? `${style.dateInput} ${style.datePlaceholder}`
                                    : `${style.dateInput}`
                            }
                            calendarClassName="date-calendar"
                        />
                    </div>
                    <p>To</p>
                    {/* <span className={style.MentorHeader} style={{color:"#0481FE",fontWeight: "600"}}><MdCalendarToday size={16}/>{endDate}</span> */}
                    <div style={{ width: "10rem" }}>
                        <ReactDatePicker
                            dateFormat="dd-MMM-yyyy"
                            selected={pageUI.end_date}
                            placeholderText="Click to select a date"
                            onChange={(date) => {
                                setPageUI({
                                    ...pageUI,
                                    end_date: date,
                                });
                                setConflictLoading(true);
                            }}
                            className={
                                pageUI.end_date === null ||
                                pageUI.end_date.length === 0
                                    ? `${style.dateInput} ${style.datePlaceholder}`
                                    : `${style.dateInput}`
                            }
                            calendarClassName="date-calendar"
                        />
                    </div>
                </span>

                {/* Body */}
                <div className={style.Body}>
                    {!conflictLoading ? (
                        data.length > 0 ? (
                            data.map((element, index) => (
                                <ConflictCard key={index} data={element} />
                            ))
                        ) : (
                            <div>Data not available</div>
                        )
                    ) : (
                        <div>Loading conflicts...</div>
                    )}
                </div>
            </div>
        </SidePane>
    );
}

const ConflictCard = ({ data }) => {
    const { setModalComp } = useContext(ManagedUI);
    var height = 2.5; /* * (data.children.length + 1) */
    height += "rem";
    return (
        <div className={style.conflictDiv}>
            <div className={style.warningText}>
                &ldquo; {data.warning} &rdquo;
            </div>
            <div className={style.details}>
                {/* Conflict type labels */}
                <span
                    style={{
                        width: "2rem",
                        height: "2rem",
                    }}
                    className={style.MentorHeader}
                    title={data.type}
                >
                    <Avatar
                        userName={data.type}
                        background="#ff6a00"
                        color="#fff"
                    />
                </span>
                <span style={{ marginLeft: "0.5rem" }}>
                    <Divider isVertical={true} length={height} />
                </span>

                <div className={style.conflictClasses}>
                    <div className={style.conflictSection}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                marginTop: "0.5rem",
                            }}
                        >
                            {" "}
                            {data.mode_id === 2 ? (
                                <OfflineIcon />
                            ) : (
                                <OnlineIcon />
                            )}
                        </span>
                        <div className={style.info}>
                            <div>{data.class_title}</div>
                            <span
                                className={style.classInfo}
                                title={`${data.subject_name}, ${data.batch_name}`}
                            >
                                {data.subject_name}, {data.batch_name}
                            </span>
                        </div>
                        <span
                            style={{
                                width: "2rem",
                                height: "2rem",
                                marginLeft: "0.5rem",
                            }}
                            className={style.MentorHeader}
                            title={data.mentor_name}
                        >
                            <Avatar userName={data.mentor_name} />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                            }}
                        >
                            <Divider isVertical={true} length={"1.5rem"} />
                        </span>

                        <div
                            className={style.info}
                            style={{
                                width: "6rem",
                            }}
                        >
                            <div>
                                {data.start_time
                                    .split(":")
                                    .splice(0, 2)
                                    .join(":")}{" "}
                                -{" "}
                                {data.end_time
                                    .split(":")
                                    .splice(0, 2)
                                    .join(":")}
                            </div>
                            <span
                                style={{
                                    color: "#B7C3C9",
                                    fontSize: "10px",
                                }}
                            >
                                {data.calendar_date}
                            </span>
                        </div>
                        {/* <span
                            className={style.editIcon}
                            onClick={() => {
                                setModalComp(
                                    <AddClassPane
                                        isEditMode={true}
                                        data={data}
                                    />
                                );
                            }}
                        >
                            <MdOutlineBorderColor />
                        </span> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
