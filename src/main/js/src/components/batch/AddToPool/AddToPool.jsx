import style from "./addtopool.module.css";
import { useContext, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Router, { useRouter } from "next/router";
//components
import { SelectForObjects } from "@components/Elements/SelectField/SelectField";
import { Button } from "@components/Elements/Buttons/Buttons";
import LoadingScreen from "@components/Elements/LoadingScreen";
//API
import { postCancelClass, getClassReasons } from "@services/Api/scheduler.api";
import { getPools } from "@services/Api/pool.api";
import { postAddToPool } from "@services/Api/batch.api";
//context
import { ManagedUI } from "@contexts/ManagedUI";
export default function AddToPool({ data }) {
    const [loading, setLoading] = useState(true);
    const { setOpenModal } = useContext(ManagedUI);
    const [poolList, setPoolList] = useState([]);
    const [formData, setFormData] = useState({
        pool_id: null,
        pool_name: null,
    });
    console.log("data", data);
    //Fetching poolList
    useEffect(() => {
        async function fetch() {
            const response = await getPools({
                status: "PUBLISHED",
            });
            //IF API FAILS
            if (response.status !== 200) return alert("Something went wrong");
            //Extracting pools
            let batchList = [];
            for (let i = 0; i < response.data.data.length; i++) {
                let batch = response.data.data[i].batches;
                for (let j = 0; j < batch.length; j++) {
                    batchList.push({
                        batch_name: batch[j].batch_name,
                        batch_id: batch[j].id,
                    });
                }
            }
            setPoolList(batchList);

            setLoading(false);
        }

        fetch();
    }, []);
    //Handling cancel class
    const onSubmit = async () => {
        let batchIdList = [];
        for (let i = 0; i < data.length; i++) {
            batchIdList.push({
                batch_id: data[i].id,
            });
        }
        let requestBody = {
            pool_id: formData.pool_id,
            batches: batchIdList,
        };

        console.log("requestBody", requestBody);
        const res = await postAddToPool(requestBody);
        console.log("res", res.data.data);
        if (res.status === 200) {
            alert("Class Cancelled");
            setOpenModal(false);
        } else {
            alert(res.data.message);
        }
    };
    if (loading) return <LoadingScreen />;

    return (
        <form className={style.confirmFormContainer}>
            <div>
                <p>Add to Pool</p>
                <Button
                    text={"+ Create New"}
                    buttonType="text"
                    minWidth="5rem"
                    width="8rem"
                    padding={"0"}
                    margin={"0"}
                    onClick={() => {
                        setOpenModal(false);
                        Router.push("/pool/new/form");
                    }}
                />
            </div>

            <div className={["input-box", style.Input].join(" ")}>
                <label>Select Pool</label>
                <SelectForObjects
                    padding="0.8rem 1rem"
                    placeholder="Select Pool"
                    options={poolList}
                    optionName="batch_name"
                    optionID="batch_id"
                    selected={formData.pool_name}
                    setselected={(data, id) => {
                        setFormData({
                            ...formData,
                            pool_id: id,
                            pool_name: data,
                        });
                    }}
                />
            </div>

            <div className={style.FormButtonControls}>
                <Button
                    text="CANCEL"
                    buttonType="tertiary"
                    buttonVariant="outlined"
                    onClick={() => setOpenModal(false)}
                    minWidth="8rem"
                />
                <Button
                    buttonType="secondary"
                    text="ADD TO POOL"
                    disabled={
                        formData.reason_id === null && formData.comment === ""
                            ? true
                            : false
                    }
                    onClick={() => onSubmit()}
                    minWidth="8rem"
                />
            </div>
        </form>
    );
}
