import style from "./newbatch.module.css";
import { useEffect, useState, useContext } from "react";
import moment from "moment/moment";
import Tippy from "@tippyjs/react";
//components
import LoadingScreen from "@components/Elements/LoadingScreen";
import SidePane from "@components/Elements/SidePane";
import { Button } from "@components/Elements/Buttons/Buttons";
//Assets
import OfflineIcon from "../../../public/Assets/offline_course.svg";
import OnlineIcon from "../../../public/Assets/online_course.svg";
import OfflineGreyIcon from "../../../public/Assets/offline_course_grey.svg";
import OnlineGreyIcon from "../../../public/Assets/online_course_grey.svg";
//API
//context
import { ManagedUI } from "@contexts/ManagedUI";
import Divider from "@components/Elements/Divider";
import { SimpleSelect } from "@components/Elements/SelectField/SelectField";

export default function CourseFlow({
    data,
    setData,
    parentTempData,
    subjectList,
}) {
    const [isLoading, setLoading] = useState(true);
    const [courseFlowData, setCourseFlowData] = useState(null);
    const { setOpenModal } = useContext(ManagedUI);
    const [items, setItems] = useState();
    const [selectedSubject, setSelectedSubject] = useState("");

    //Runs only Once
    useEffect(() => {
        setCourseFlowData(JSON.parse(JSON.stringify(parentTempData)));
        setItems(JSON.parse(JSON.stringify(parentTempData)));
        setLoading(false);
    }, []);

    //Save Changes
    const saveChanges = () => {
        setData(courseFlowData);
        setOpenModal(false);
    };

    //Reset to default
    const reset = () => {
        let localTemp = JSON.parse(JSON.stringify(data));
        setCourseFlowData(localTemp);
    };
    //Handle Subject Filter
    const handleFilter = (entry) => {
        if (entry === "All Subjects") {
            setItems(courseFlowData);
            return;
        }
        let items = courseFlowData;
        const filteredItems = items.filter(
            (item) => item.subject_name === entry
        );
        setItems(filteredItems);
    };

    if (isLoading) return <LoadingScreen />;
    return (
        <SidePane position="right" padding="0">
            <div className={style.container}>
                <span className={style.header}>
                    <p>Course Flow</p>
                    <Divider isVertical={true} />
                    <SimpleSelect
                        options={["All Subjects", ...subjectList]}
                        setselected={(entry) => {
                            handleFilter(entry);
                            setSelectedSubject(entry);
                        }}
                        selected={selectedSubject}
                    />
                </span>
                <span className={style.RowContainer}>
                    {items.length != 0 ? (
                        items.map((element, key) => (
                            <CourseFlowRow
                                key={key}
                                data={element}
                                superData={courseFlowData}
                                setSuperData={setCourseFlowData}
                                index={key}
                            />
                        ))
                    ) : (
                        <span className={style.cfControls}>
                            <p>No data available within selected slots</p>
                        </span>
                    )}
                </span>
            </div>
            <div className={style.buttonControls}>
                <Button
                    text="RESET TO DEFAULT"
                    buttonType="tertiary"
                    buttonVariant="outlined"
                    onClick={() => reset()}
                    minWidth="10rem"
                />
                <Button
                    buttonType="primary"
                    text="SAVE CHANGES"
                    minWidth="10rem"
                    onClick={() => saveChanges()}
                />
            </div>
        </SidePane>
    );
}

const CourseFlowRow = ({ data, index, superData, setSuperData }) => {
    const [status, setStatus] = useState(data.mode_name);
    //Upadting local UI State on every updation of parent element
    useEffect(() => {
        setStatus(data.mode_name);
    }, []);

    const toggleStatus = (classNum) => {
        let tempSuperData = superData; //deep and local copy of courseflow data
        for (let i = 0; i < tempSuperData.length; i++) {
            if (tempSuperData[i].class_number === classNum) {
                tempSuperData[i].mode_name =
                    status === "Online" ? "Offline" : "Online";
                tempSuperData[i].mode_id = status === "Online" ? 1 : 2;
                if (status === "Online") {
                    setStatus("Offline"); //Updating local UI State
                } else {
                    setStatus("Online");
                }
                break;
            }
        }
        setSuperData([...tempSuperData]);
    };
    let date = moment(data.calendar_date).format("DD MMM YYYY");
    return (
        <div className={style.CourseFlowRow}>
            <p>{data.class_number}</p>
            <Divider isVertical={true} margin="0 .5rem" />
            <span className={style.rowDetails}>
                <span className={style.details}>
                    <p>{data.class_title}</p>
                    <p>{data.subject_name}</p>
                </span>
                <span className={style.date}>{date}</span>
                <span
                    className={style.toggleBtn}
                    onClick={() => toggleStatus(data.class_number)}
                >
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
                        <Tippy content="Online">
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
