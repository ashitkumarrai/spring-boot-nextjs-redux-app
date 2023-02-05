import style from "./classroomComp.module.css";
import { useContext } from "react";
import { useRouter } from "next/router";

//components
import SidePane from "@components/Elements/SidePane";
import Divider from "@components/Elements/Divider";
import { Button } from "@components/Elements/Buttons/Buttons";
import AddLeave from "./AddLeave/AddLeave";
//Assets
import OfflineIcon from "../../public/Assets/offline_course.svg";
import OnlineIcon from "../../public/Assets/online_course.svg";
//context
import { ManagedUI } from "@contexts/ManagedUI";
//API
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
export default function ClassDetails({ data }) {
    //console.log("class details", data);
    const { setOpenModal, setModalComp } = useContext(ManagedUI);
    const router = useRouter();
    return (
        <SidePane position="right" padding="0" width="28%">
            <div className={style.container}>
                {/* Header */}
                <span className={style.MentorHeader}>
                    <span className={style.CourseIconContainer}>
                        {data.mode_id === 2 ? <OfflineIcon /> : <OnlineIcon />}
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
                        <p>City :</p>
                        <p>{data.centre.city.city_name || " -- "}</p>
                        <p>Centre :</p>
                        <p>{data.centre.centre_name || " -- "}</p>
                        <p>Type :</p>
                        <p>{data.type || " --  "}</p>
                        <p>Subject Preference :</p>
                        <p className={style.subjectsContainer}>
                            {data.preferred_products.length > 0 ? (
                                data.preferred_products.map((element, key) => (
                                    <span key={key}>
                                        <p>{element.priority}.</p>
                                        {element.course_name}
                                    </span>
                                ))
                            ) : (
                                <span> -- </span>
                            )}
                        </p>
                    </span>
                </span>
                <Divider length="100%" thickness="1px" />

                <span className={style.timingRowHeader}>
                    <p>Day</p>
                    <p>Start Time</p>
                    <p>End Time</p>
                </span>
                {/* Classes Sections */}
                <span className={style.RowContainer}>
                    {data.functional_hours.length > 0 ? (
                        data.functional_hours.map((element, key) => (
                            <span key={key} className={style.timingRow}>
                                <p>{weekdays[element.day_id]}</p>
                                <p>{element.start_time}</p>
                                <p>{element.end_time}</p>
                            </span>
                        ))
                    ) : (
                        <span>No Classes</span>
                    )}
                </span>
                {/* Button COntrols */}
                <span className={style.buttonSpan}>
                    <Button
                        text="Edit Classroom Details"
                        buttonType="secondary"
                        onClick={() => {
                            setOpenModal(false);
                            router.push({
                                pathname: "/classroom/addclassroom",
                                query: { id: data.id },
                            });
                        }}
                    />
                    <Button
                        text="Add Leave"
                        buttonType="secondary"
                        onClick={() => {
                            setModalComp(<AddLeave data={data} />);
                        }}
                        minWidth="10rem"
                    />
                </span>
            </div>
        </SidePane>
    );
}
