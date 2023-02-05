import style from "./mentorComp.module.css";
import { useEffect, useState, useContext, useMemo } from "react";
import { useRouter } from "next/router";
//components
import SidePane from "@components/Elements/SidePane";
import Divider from "@components/Elements/Divider";
import Avatar from "@components/Elements/Avatar";
import { Button } from "@components/Elements/Buttons/Buttons";

//Assets
//context
import { ManagedUI } from "@contexts/ManagedUI";
import AddLeave from "./AddLeave/AddLeave";
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export default function MentorDetails({ data }) {
    const { openModal, setOpenModal, setModalComp } = useContext(ManagedUI);
    const router = useRouter();
    console.log("data", data);
    let img =
        data.profile_image != null
            ? "https://beta.samay.imsindia.com" + data.profile_image
            : null;
    return (
        <SidePane position="right" padding="0" width="28%">
            <div className={style.container}>
                {/* Mentor Details */}
                <span className={style.MentorBriefContainer}>
                    <span className={style.MentorAvatar}>
                        <Avatar userName={data.mentor_name} imgUrl={img} />
                    </span>

                    <span className={style.MentorName}>
                        <p>{data.mentor_name || " -- "}</p>
                    </span>
                </span>

                <span className={style.MentorBrief}>
                    <p>Mode:</p>
                    <p>
                        {data.mode === "FULL_TIME" ? "Full time" : "Part Time"}
                    </p>
                    <p>City :</p>
                    <p>{data.city.city_name}</p>
                    <p>Centres :</p>
                    <p className={style.centresContainer}>
                        {data.centres.length > 0 ? (
                            data.centres.map((element, key) => (
                                <span key={key}>{element.centre_name},</span>
                            ))
                        ) : (
                            <span> -- </span>
                        )}
                    </p>
                    <p>Subject Preference :</p>
                    <p className={style.subjectsContainer}>
                        {data.subjects.length > 0 ? (
                            data.subjects.map((element, key) => (
                                <span key={key}>
                                    <p>{element.priority}.</p>
                                    {element.subject_name} (
                                    {element.product_name})
                                </span>
                            ))
                        ) : (
                            <span> -- </span>
                        )}
                    </p>
                </span>

                <Divider length="100%" thickness="1px" />
                <span className={style.timingContainer}>
                    <p>Timings</p>
                    <span>
                        {data.centres.length > 0 ? (
                            data.timings.map((element, key) => (
                                <span key={key} className={style.slot}>
                                    <p>{weekdays[element.day_id]}</p>
                                    <p>{element.start_time}</p>
                                    <p>{element.end_time}</p>
                                </span>
                            ))
                        ) : (
                            <p>No slots available</p>
                        )}
                    </span>
                </span>
                <span className={style.buttonSpan}>
                    <Button
                        text="Edit Mentor Details"
                        buttonType="secondary"
                        onClick={() => {
                            setOpenModal(false);
                            router.push({
                                pathname: "/mentor/addmentor",
                                query: { id: data.id },
                            });
                        }}
                        minWidth="10rem"
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
