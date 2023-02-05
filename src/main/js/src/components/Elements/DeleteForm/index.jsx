import style from "./deleteform.module.css";
import { useContext } from "react";
//components
import { Button } from "@components/Elements/Buttons/Buttons";
//Contexts
import { ManagedUI } from "@contexts/ManagedUI";

export default function DeleteForm({
    heading,
    description,
    buttonText,
    buttonText1,
    handleFunction,
}) {
    const { setOpenModal } = useContext(ManagedUI);
    const handleSubmit = async () => {
        alert("You delete something :(");
        setOpenModal(false);
    };

    return (
        <div className={style.innerModalContainer}>
            <p className={style.heading}>{heading}</p>
            <p className={style.description}>{description}</p>
            <span className={style.btnControls}>
                <Button
                    text={buttonText}
                    buttonType="secondary"
                    onClick={handleFunction}
                    height="2rem"
                    minWidth="8rem"
                />
                <Button
                    text={buttonText1}
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
DeleteForm.defaultProps = {
    heading: "Heading",
    description: "Description lorem epsum salt is salty",
    buttonText: "Delete",
    buttonText1: "Cancel",
};
