import style from "./newpool.module.css";
import { useEffect, useState } from "react";
import moment from "moment/moment";
//components
import SidePane from "@components/Elements/SidePane";
import Divider from "@components/Elements/Divider";
import { SelectForObjects } from "@components/Elements/SelectField/SelectField";
import Avatar from "@components/Elements/Avatar";

//Assets
//context
//api

import { getMentorByPool } from "@services/Api/pool.api";
export default function MentorDetails({
    data,
    batch_id,
    daySlots,
    subjectId,
    selectedDayProp,
}) {
    const [tempRow, setTempRow] = useState([
        {
            name: "Polymorphism Property",
            status: "Offline",
        },
    ]);
    const [isLoading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState(selectedDayProp);
    const [filterCourseFlowArray, setFilterCourseFlowArray] = useState([]);
    let priority = null;

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
            const MentorRes = await getMentorByPool({
                batch_id: batch_id,
                mentor_id: data.mentor_id,
                subject_id: subjectId,
                slots: daySlotsArray,
            });
            //console.log(MentorRes);
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
    /* To render priority tag */
    if (data.priority == 1) {
        priority = "First";
    } else if (data.priority == 2) {
        priority = "Second";
    } else if (data.priority == 3) {
        priority = "Third";
    } else {
        priority = null;
    }

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
        if (selectedDay !== undefined) {
            let tempSelectedDay = selectedDay.split(" ")[0];
            let tempSelectedTime = selectedDay
                .split(" ")[1]
                .split("(")[1]
                .split(")")[0];

            const filteredCourseFlow = tempRow.filter(
                (entry) =>
                    moment(entry.date).format("dddd") === tempSelectedDay &&
                    entry.time === tempSelectedTime
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
                    <p>{data.mentor_info.mentor_name || " -- "}</p>
                    <Divider isVertical={true} margin="0 .5rem" />
                    <p className={style.MentorSubjectText}>CAT, Quant</p>
                </span>
                {/* Mentor Details */}
                <span className={style.MentorBriefContainer}>
                    <span className={style.MentorAvatar}>
                        <Avatar userName={data.mentor_name} />
                    </span>

                    <span className={style.MentorBrief}>
                        <p>Preference :</p>
                        <p>{priority}</p>
                        <p>Net Availability :</p>
                        <p>
                            {Math.round(data.net_avail_percent) + "%" || " -- "}
                        </p>
                        {/*  <p>centre :</p>
                        <p>Centre 1</p> */}
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
                    <span className={style.MentorStatus}>
                        <span></span>
                        <p>Holiday</p>
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
        <div className={style.courseContainer}>
            <div
                className={[style.CourseFlowRow, style.MentorCourseRow].join(
                    " "
                )}
            >
                <p>{data.class_number}</p>
                <Divider isVertical={true} margin="0 .5rem" />
                <span
                    className={`${style.MentorStatus} ${style[availibititySpan]}`}
                ></span>
                <span className={style.details}>
                    <p>{data.class_title}</p>
                    <p>{data.subject_name}</p>
                </span>
                <Divider isVertical={true} margin="0 .5rem" />
                <span className={style.date}>
                    <p>{data.time}</p>
                    <p>{startDate}</p>
                </span>
            </div>
            {data.class_taken && <div className={style.blurScreen}></div>}
        </div>
    );
};
