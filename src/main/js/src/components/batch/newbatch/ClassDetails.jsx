import style from "./newbatch.module.css";
import { useState, useEffect } from "react";
import moment from "moment/moment";
import Tippy from "@tippyjs/react";
//components
import SidePane from "@components/Elements/SidePane";
import Divider from "@components/Elements/Divider";
import { SelectForObjects } from "@components/Elements/SelectField/SelectField";

//Assets
import OfflineIcon from "../../../public/Assets/offline_course.svg";
import OnlineIcon from "../../../public/Assets/online_course.svg";
//context

//API
import { getClassroomByBatch } from "@services/Api/batch.api";
export default function ClassDetails({
    data,
    mode,
    batch_id,
    daySlots,
    selectedDayProp,
}) {
    const [tempRow, setTempRow] = useState([
        {
            name: "Polymorphism Property",
            status: "Offline",
        },
        { name: "Quantative Analysis", status: "Online" },
    ]);
    const [isLoading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState(selectedDayProp);
    const [filterCourseFlowArray, setFilterCourseFlowArray] = useState([]);

    useEffect(() => {
        async function fetch() {
            let daySlotsArray = [];
            //Curating day slots
            for (let i = 0; i < daySlots.length; i++) {
                daySlotsArray.push({
                    day_id: daySlots[i].day_id,

                    time: daySlots[i].time,
                });
            }
            const MentorRes = await getClassroomByBatch({
                batch_id: batch_id,
                slots: daySlotsArray,
                classroom_id: data.id,
            });
            let tempSlots = [];
            for (let i = 0; i < MentorRes.data.slot.length; i++) {
                for (
                    let j = 0;
                    j < MentorRes.data.slot[i].class_list.length;
                    j++
                ) {
                    tempSlots.push(MentorRes.data.slot[i].class_list[j]);
                }
            }
            tempSlots.sort((a, b) => {
                return a.class_number - b.class_number;
            });
            setTempRow(tempSlots);
            setFilterCourseFlowArray(tempSlots);
            setLoading(false);
        }
        fetch();
    }, []);
    //Curating day slots
    let daySlotsArray = [];
    daySlotsArray.push({
        day_slot: "All",
    });
    for (let i = 0; i < daySlots.length; i++) {
        daySlotsArray.push({
            day_slot: daySlots[i].day_name + " (" + daySlots[i].time + ")",
            day_id: daySlots[i].day_id,
            day_name: daySlots[i].day_name,
            time: daySlots[i].time,
        });
    }
    useEffect(() => {
        if (selectedDay === "All") {
            setFilterCourseFlowArray(tempRow);
            return;
        }
        console.log("courese", filterCourseFlowArray);

        console.log(selectedDay);
        if (selectedDay !== undefined) {
            let tempSelectedDay = selectedDay.split(" ")[0];
            let tempSelectedTime = selectedDay
                .split(" ")[1]
                .split("(")[1]
                .split(")")[0];

            const filteredCourseFlow = tempRow.filter(
                (entry) =>
                    moment(entry.calendar_date).format("dddd") ===
                        tempSelectedDay && entry.time === tempSelectedTime
            );
            setFilterCourseFlowArray(filteredCourseFlow);
        }
    }, [selectedDay]);

    if (isLoading) return <div>Loading...</div>;
    return (
        <SidePane position="right" padding="0" width="28%">
            <div className={style.container}>
                {/* Header */}
                <span className={style.MentorHeader}>
                    <span className={style.CourseIconContainer}>
                        {mode === "Offline" ? <OfflineIcon /> : <OnlineIcon />}
                    </span>
                    <Divider isVertical={true} margin="0 .5rem" />
                    <p>{data.name}</p>
                </span>
                {/* Class Details */}
                <span
                    className={style.MentorBriefContainer}
                    style={{ padding: "0.75rem 0" }}
                >
                    <span className={style.MentorBrief}>
                        <p>Capacity :</p>
                        <p>{data.capacity || " --  "}</p>
                        <p>Net Availability :</p>
                        <p>
                            {Math.round(data.net_avail_percent) + "%" || " -- "}
                        </p>
                        <p>Type :</p>
                        <p>{data.type || " --  "}</p>
                    </span>
                </span>
                <Divider length="100%" thickness="1px" />
                {/* Header 2 */}
                <span className={style.header2}>
                    <p className={style.availabilityText}>Availability</p>
                    <Divider isVertical={true} />
                    <SelectForObjects
                        options={daySlotsArray}
                        optionName="day_slot"
                        selected={selectedDay}
                        setselected={(entry) => {
                            setSelectedDay(entry);
                        }}
                    />
                </span>
                {/* Status Legends */}
                <span className={style.MentorStatusContainer}>
                    <span className={style.MentorStatus}>
                        <span></span>
                        <p>Full</p>
                    </span>
                    <span className={style.MentorStatus}>
                        <span></span>
                        <p>Partial</p>
                    </span>
                    <span className={style.MentorStatus}>
                        <span></span>
                        <p>None</p>
                    </span>
                </span>
                {/* Classes Sections */}
                <span
                    className={[
                        style.RowContainer,
                        style.MentorRowContainer,
                    ].join(" ")}
                >
                    {filterCourseFlowArray.length > 0 ? (
                        filterCourseFlowArray.map((element, key) => (
                            <CourseFlowRow
                                key={key}
                                data={element}
                                index={key}
                            />
                        ))
                    ) : (
                        <p>No Classes</p>
                    )}
                </span>
            </div>
        </SidePane>
    );
}

const CourseFlowRow = ({ data, index }) => {
    let startDate = moment(data.date).format("DD-MMM-YYYY");
    let availibititySpan = null;
    if (data.availability == "Full") {
        availibititySpan = "full";
    } else if (data.availability == "Partial") {
        availibititySpan = "partial";
    } else if (data.availability == "None") {
        availibititySpan = "none";
    } else if (data.availability == "Holiday") {
        availibititySpan = "holiday";
    }
    return (
        <div className={[style.CourseFlowRow, style.MentorCourseRow].join(" ")}>
            <p>{data.class_number}</p>
            <Divider isVertical={true} margin="0 .5rem" />
            <span
                className={`${style.MentorStatus} ${style[availibititySpan]}`}
            ></span>
            <span className={style.details}>
                <Tippy content={data.class_title} theme="tomato">
                    <p>{data.class_title}</p>
                </Tippy>
                <p>{data.subject_name}</p>
            </span>
            <Divider isVertical={true} margin="0 .5rem" />
            <span className={style.date}>
                <p>{data.start_time}</p>
                <p>{startDate}</p>
            </span>
        </div>
    );
};
