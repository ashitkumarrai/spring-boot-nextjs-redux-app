import style from "./SwapClasses.module.css";
import { useContext } from "react";
//components
import { Button } from "@components/Elements/Buttons/Buttons";
//Contexts
import { ManagedUI } from "@contexts/ManagedUI";

export default function SwapClasses({ class1, class2, handleFunction }) {
    const { setOpenModal } = useContext(ManagedUI);

    return (
        <div className={style.innerModalContainer}>
            <p className={style.heading}>Swap Classes</p>
            <p className={style.description}>
                Confirm swapping of <strong>{class1 + " "}</strong> with
                <strong>{" " + class2} </strong> .
            </p>
            <span className={style.btnControls}>
                <Button
                    text={"Confirm"}
                    buttonType="secondary"
                    onClick={handleFunction}
                    height="2rem"
                    minWidth="8rem"
                />
                <Button
                    text={"Cancel"}
                    buttonType="tertiary"
                    buttonVariant="outlined"
                    type="submit"
                    onClick={() => setOpenModal(false)}
                    minWidth="8rem"
                    height="2rem"
                />
            </span>
        </div>
    );
}
