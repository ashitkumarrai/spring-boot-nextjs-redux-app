import { useEffect, useState, useContext } from "react";
import style from "@styles/batch.module.css";
import moment from "moment";
import { useRouter } from "next/router";
import LocalStorageService from "@services/LocalStorageHandler";
const localStorage = LocalStorageService.getService();
//components
import { Button } from "@components/Elements/Buttons/Buttons";
import LoadingScreen from "@components/Elements/LoadingScreen";

//Assets
import Avatar from "@components/Elements/Avatar";
import { MdOutlineClose } from "react-icons/md";
import SidePane from "@components/Elements/SidePane";
//context
import { ManagedUI } from "@contexts/ManagedUI";
//API
import { getBatchDetails } from "@services/Api/batch.api";

/* Course Flow Component */
const BatchDetails = ({ data }) => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const { openModal, setOpenModal, setModalComp } = useContext(ManagedUI);
    const [batchDetails, setBatchDetails] = useState();
    useEffect(() => {
        async function fetch() {
            const BatchResponse = await getBatchDetails(data.id);

            // console.log(" batch info", BatchResponse.data.data);
            if (BatchResponse.status === 200) {
                let startDate =
                    BatchResponse.data.data.start_date == null
                        ? "--"
                        : moment(BatchResponse.data.data.start_date).format(
                              "DD-MMM-yyyy"
                          );
                let endDate =
                    BatchResponse.data.data.end_date == null
                        ? "--"
                        : moment(BatchResponse.data.data.end_date).format(
                              "DD-MMM-yyyy"
                          );
                setBatchDetails({
                    ...BatchResponse.data.data,
                    startDate,
                    endDate,
                });
            }
            setLoading(false);
        }
        fetch();
    }, []);
    if (isLoading) return <LoadingScreen />;
    return (
        <SidePane position="right">
            <div className={style.batchDetailsDiv}>
                {/* Detail Section */}
                <div className={style.detailSection}>
                    <span className={style.header}>
                        <p>{batchDetails.batch_name}</p>{" "}
                        <span
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            <MdOutlineClose />
                        </span>
                    </span>
                    <span className={style.details}>
                        <p>Product:</p>
                        <p>{batchDetails.variant.course.course_name || "--"}</p>
                        <p>Variant:</p>
                        <p>{batchDetails.variant.variant_name || "--"}</p>
                        {/* <p>Name:</p>
                        <p>{batchDetails.batch_name}</p> */}
                        <p>City:</p>
                        <p>{batchDetails.centre.city.city_name || "--"}</p>
                        <p>Centre:</p>
                        <p>{batchDetails.centre.centre_name || "--"}</p>
                        <p>Start Date:</p>
                        <p>{batchDetails.startDate || "--"}</p>
                        <p>End Date:</p>
                        <p>{batchDetails.endDate || "--"}</p>
                        <p>Capacity:</p>
                        <p>{batchDetails.strength || "--"}</p>
                        <p>Progress:</p>
                        <p>{batchDetails.progress || "--"}</p>
                    </span>
                </div>
                {/* Divider */}
                <div className={style.horFormDiv}> </div>

                {/* Mentor Section */}
                <div className={style.mentorSection}>
                    {batchDetails.batch_mentors.map((entry, key) => (
                        <div key={key} className={style.mentorSlot}>
                            <p>
                                Mentor
                                <p className={style.innerMins}>
                                    ({entry.subject_name})
                                </p>
                            </p>
                            <span className={style.mentorPlaceholder}>
                                <span className={style.selectedMentor}>
                                    <span>
                                        <span className={style.mentorAvatar}>
                                            <Avatar
                                                userName={entry.mentor_name}
                                                imgUrl={entry.mentor_picture}
                                            />
                                        </span>

                                        <p className={style.mentorName}>
                                            {entry.mentor_name}
                                        </p>
                                    </span>
                                </span>
                            </span>
                        </div>
                    ))}

                    <div className={style.mentorSlot}>
                        <p>Offline Classroom</p>
                        <span className={style.mentorPlaceholder}>
                            {batchDetails.batch_classrooms[0] == null ? (
                                <p>Your classroom selection will appear here</p>
                            ) : (
                                <span className={style.selectedMentor}>
                                    {
                                        batchDetails.batch_classrooms[0]
                                            .classroom_name
                                    }
                                </span>
                            )}
                        </span>
                    </div>
                    <div className={style.mentorSlot}>
                        <p>Online Classroom</p>
                        <span className={style.mentorPlaceholder}>
                            {batchDetails.batch_classrooms[1] == null ? (
                                <p>Your classroom selection will appear here</p>
                            ) : (
                                <span className={style.selectedMentor}>
                                    {
                                        batchDetails.batch_classrooms[1]
                                            .classroom_name
                                    }
                                </span>
                            )}
                        </span>
                    </div>
                </div>
                {/*  Button */}
                <div className={style.btnCtrl}>
                    <Button
                        text="EDIT BATCH"
                        buttonType="secondary"
                        margin="0"
                        minWidth="10rem"
                        width="10rem"
                        onClick={() => {
                            localStorage.setBatchDraft(batchDetails);
                            router.push("/batch/newbatch/planning");
                        }}
                    />{" "}
                    <Button
                        text="VIEW SCHEDULE"
                        buttonType="secondary"
                        margin="0"
                        minWidth="10rem"
                        width="10rem"
                    />{" "}
                </div>
            </div>
        </SidePane>
    );
};
export default BatchDetails;
