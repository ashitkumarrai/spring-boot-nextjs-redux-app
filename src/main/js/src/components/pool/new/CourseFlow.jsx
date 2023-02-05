import style from "./newbatch.module.css";
import { useEffect, useState, useContext } from "react";
//components
import LoadingScreen from "@components/Elements/LoadingScreen";
import SidePane from "@components/Elements/SidePane";
import { Button } from "@components/Elements/Buttons/Buttons";
//Assets
import { MdModeEdit, MdOutlineClear } from "react-icons/md";
import OfflineIcon from "../../../public/Assets/offline_course.svg";
import OnlineIcon from "../../../public/Assets/online_course.svg";
import OfflineGreyIcon from "../../../public/Assets/offline_course_grey.svg";
import OnlineGreyIcon from "../../../public/Assets/online_course_grey.svg";
//API
import { getCourseFlow } from "@services/Api/batch.api";
//context
import { ManagedUI } from "@contexts/ManagedUI";
import Divider from "@components/Elements/Divider";
import { SimpleSelect } from "@components/Elements/SelectField/SelectField";
import Tippy from "@tippyjs/react";

export default function CourseFlow({ data, setData }) {
    const [isLoading, setLoading] = useState(true);
    const [courseFlowData, setCourseFlowData] = useState(null);
    const { setOpenModal } = useContext(ManagedUI);
    //Runs only Once
    useEffect(() => {
        setCourseFlowData(JSON.parse(JSON.stringify(data)));
        setLoading(false);
    }, []);

    const saveChanges = () => {
        setData(courseFlowData);
        setOpenModal(false);
    };

    const reset = () => {
        let localTemp = JSON.parse(JSON.stringify(data));
        setCourseFlowData(localTemp);
    };

    if (isLoading) return <LoadingScreen />;
    return (
        <SidePane position="right" padding="0">
            <div className={style.container}>
                <span className={style.header}>
                    <p>Course Flow</p>
                    <Divider isVertical={true} />
                    <SimpleSelect />
                </span>
                <span className={style.RowContainer}>
                    {courseFlowData.map((element, key) => (
                        <CourseFlowRow
                            key={key}
                            superData={courseFlowData}
                            setSuperData={setCourseFlowData}
                            index={key}
                        />
                    ))}
                </span>
            </div>
            <div className={style.buttonControls}>
                <Button
                    buttonType="primary"
                    text="SAVE CHANGES"
                    minWidth="10rem"
                    onClick={() => saveChanges()}
                />
                <Button
                    text="RESET TO DEFAULT"
                    buttonType="tertiary"
                    buttonVariant="outlined"
                    onClick={() => reset()}
                    minWidth="10rem"
                />
            </div>
        </SidePane>
    );
}

const CourseFlowRow = ({ index, superData, setSuperData }) => {
    const [status, setStatus] = useState(superData[index].mode_name);
    //Upadting local UI State on every updation of parent element
    useEffect(() => {
        setStatus(superData[index].mode_name);
    }, [superData]);

    const toggleStatus = () => {
        let tempSuperData = superData; //deep and local copy of courseflow data
        if (status === "Online") {
            setStatus("Offline"); //Updating local UI State
            tempSuperData[index].mode_name = "Offline";
        } else {
            setStatus("Online");
            tempSuperData[index].mode_name = "Online";
        }
        setSuperData([...tempSuperData]);
    };
    return (
        <div className={style.CourseFlowRow}>
            <p>{index + 1}</p>
            <Divider isVertical={true} margin="0 .5rem" />
            <span className={style.rowDetails}>
                <span className={style.details}>
                    <p>{superData[index].class_title}</p>
                    <p>{superData[index].subject_name}</p>
                </span>
                <span className={style.date}>
                    {superData[index].calendar_date}
                </span>
                <span className={style.toggleBtn} onClick={toggleStatus}>
                    <span className={status === "Online" && style.selected}>
                        <Tippy content="Offline" theme="tomato">
                            {status === "Online" ? (
                                <OfflineGreyIcon />
                            ) : (
                                <OfflineIcon />
                            )}
                        </Tippy>
                    </span>

                    <span className={status === "Offline" && style.selected}>
                        <Tippy content="Online" theme="tomato">
                            {status === "Offline" ? (
                                <OnlineGreyIcon />
                            ) : (
                                <OnlineIcon />
                            )}
                        </Tippy>
                    </span>
                </span>
            </span>
        </div>
    );
};
