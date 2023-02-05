import { useEffect, useState, useContext, forwardRef } from "react";
import style from "@styles/batch.module.css";
import moment from "moment/moment";
//components
import Divider from "@components/Elements/Divider";
import { SimpleSelect } from "@components/Elements/SelectField/SelectField";

//Assets
import { MdOutlineClose } from "react-icons/md";
import OfflineIcon from "../../public/Assets/offline_course.svg";
import OnlineIcon from "../../public/Assets/online_course.svg";
//context
import { ManagedUI } from "@contexts/ManagedUI";
import SidePane from "@components/Elements/SidePane";
//API
import { getBatchDetails } from "@services/Api/batch.api";

/* Course Flow Component */
const CourseFlowSidePane = ({ batch_id }) => {
    const { setOpenModal } = useContext(ManagedUI);
    const [tempRow, setTempRow] = useState([]);
    useEffect(() => {
        async function fetch() {
            const res = await getBatchDetails(batch_id);

            if (res.status == 200) {
                setTempRow(res.data.data.course_flows);
                console.log(res.data.data.course_flows);
            }
        }
        fetch();
    }, []);

    return (
        <SidePane position="right">
            <div className={style.courseFlowDiv}>
                <span className={style.ColumnHeading}>
                    <p className={style.headingText}>Course Flow</p>{" "}
                    <Divider isVertical={true} length="60%" thickness="2px" />
                    <SimpleSelect />
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        <MdOutlineClose />
                    </span>
                </span>{" "}
                <Divider length="100%" thickness="2px" />
                <span className={style.RowsContainer}>
                    {tempRow.length > 0 ? (
                        tempRow.map((element, key) => {
                            let date = moment(element.calendar_date).format(
                                "DD MMM YYYY"
                            );

                            return (
                                <div key={key} className={style.CourseFlowRow}>
                                    <p>{element.class_number}</p>
                                    <Divider
                                        isVertical={true}
                                        margin="0 1rem"
                                    />
                                    <span className={style.rowDetails}>
                                        <span
                                            className={
                                                style.CourseIconContainer
                                            }
                                        >
                                            {element.mode_id === 1 ? (
                                                <OfflineIcon />
                                            ) : (
                                                <OnlineIcon />
                                            )}
                                        </span>

                                        <span className={style.details}>
                                            <p>{element.class_title}</p>
                                            <p>
                                                {element.subject_name || " -- "}
                                            </p>
                                        </span>
                                        <span className={style.date}>
                                            {date}
                                        </span>
                                    </span>
                                </div>
                            );
                        })
                    ) : (
                        <p>No Courseflow found.</p>
                    )}
                </span>
            </div>
        </SidePane>
    );
};
export default CourseFlowSidePane;
