import style from "./newpool.module.css";
import { useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import moment from "moment";
import LocalStorageService from "@services/LocalStorageHandler";
const localStorage = LocalStorageService.getService();
//components
import ReactDatePicker from "react-datepicker";
import { Button } from "@components/Elements/Buttons/Buttons";
import Divider from "@components/Elements/Divider";
import { SelectForObjects } from "@components/Elements/SelectField/SelectField";
//Assets
import { MdOutlineClose } from "react-icons/md";
//API
import { postBatchFinal, getBatches } from "@services/Api/batch.api";
import {
    postPoolFinal,
    getBatchList,
    postEditPool,
} from "@services/Api/pool.api";
//context
import { ManagedUI } from "@contexts/ManagedUI";
import { GlobalContext } from "@contexts/GlobalData";

export default function AddBatches({ data }) {
    const Router = useRouter();
    const { newBatchData, setNewBatchData } = useContext(GlobalContext);
    const { setOpenModal, setModalComp, openModal } = useContext(ManagedUI);
    const [loading, setLoading] = useState(true);
    const [batchList, setBatchList] = useState([]);
    const [formData, setFormData] = useState({
        selectedBatches: [],
        strength: null,
    });
    useEffect(() => {
        async function fetch() {
            let ls = localStorage.getPoolDraft();
            const params = {
                status: "PUBLISHED",
            };
            const response = await getBatchList(params);
            if (response.status === 200) {
                if (ls.edit) {
                    let temp = response.data.data;
                    let temp2 = temp.filter(
                        (batch) => batch.id !== data.batches.id
                    );
                    setFormData({ ...formData, selectedBatches: data.batches });
                    setBatchList([...temp2]);
                } else {
                    setBatchList(response.data.data);
                }
            }
            /*     if (ls.edit) {
                setFormData({ ...formData, selectedBatches: data.batches });
            } */
            setLoading(false);
        }
        fetch();
    }, []);
    const batchFinalSave = async () => {
        let tempbatches = [];
        for (let i = 0; i < formData.selectedBatches.length; i++) {
            tempbatches.push({
                batch_id: formData.selectedBatches[i].id,
            });
        }
        let requestBody = {
            ...data,
            batches: tempbatches,
        };
        let ls = localStorage.getPoolDraft();
        if (ls.edit) {
            const CourseFlowResponse = await postEditPool(requestBody);
            console.log("edited", CourseFlowResponse);
            if (CourseFlowResponse.status === 200) {
                setOpenModal(false);
                Router.push("/pool");
            }
        } else {
            const CourseFlowResponse = await postPoolFinal(requestBody);
            console.log(CourseFlowResponse);
            if (CourseFlowResponse.status === 200) {
                setOpenModal(false);
                Router.push("/pool");
            }
        }
    };
    const handleRemoval = (item) => {
        let temp = batchList;
        temp.push(item);
        let temp2 = formData.selectedBatches.filter(
            (batch) => batch.id !== item.id
        );
        setFormData({ ...formData, selectedBatches: temp2 });
        setBatchList([...temp]);
    };
    console.log("data", data);
    console.log("formData", formData.selectedBatches);
    return (
        <div className={style.confirmFormContainer}>
            {loading && (
                <div className={style.loadingCover}>Loading Batches...</div>
            )}
            <p>Add Batches</p>
            <p>Select a list of batches to pool</p>
            <div className={["input-box", style.Input].join(" ")}>
                <label>Select Batch</label>
                <SelectForObjects
                    options={batchList}
                    optionName="batch_name"
                    optionID="id"
                    setselected={(entry, id) => {
                        let temp = formData.selectedBatches;

                        let tempbatchlist = batchList.filter(
                            (item) => item.batch_name !== entry
                        );

                        setBatchList([...tempbatchlist]);
                        temp.push({ batch_name: entry, id: id });
                        setFormData({ ...formData, selectedBatches: temp });
                    }}
                    /* selected={"Select Batches"} */
                    placeholder="Select Batches"
                    fontsize="0.75rem"
                    margin="0.09rem 0.25rem "
                />
            </div>
            <div className={style.selectedBatchBox}>
                {formData.selectedBatches.map((item, key) => (
                    <span
                        className={style.selectedBatch}
                        key={key}
                        onClick={() => handleRemoval(item)}
                    >
                        <p>{item.batch_name}</p>
                        <MdOutlineClose />
                    </span>
                ))}
            </div>
            <Divider length="100%" margin="1rem 0" />
            <div className={style.FormButtonControls}>
                <Button
                    text="CANCEL"
                    buttonType="tertiary"
                    buttonVariant="outlined"
                    onClick={() => setOpenModal(false)}
                    minWidth="10rem"
                />
                <Button
                    buttonType="primary"
                    text="CREATE POOL"
                    onClick={() => batchFinalSave()}
                    minWidth="10rem"
                />
            </div>{" "}
        </div>
    );
}
