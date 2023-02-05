import style from "./Button.module.css";
/*
 * Components : Button
 * Props :
 *      type:string,
 *      text:string,
 *      disabled:boolen,
 *      theme:string,
 *      padding:string,
 *      fontSize:string,
 *      fontWeight:string,
 *      bgcolor:string,
 * Button Types : Primary, Secondary and tertiary
 * Button Variants : contained, outlined and text
 *
 */
export const Button = ({
    buttonType,
    buttonVariant,
    padding,
    margin,
    width,
    minWidth,
    fontsize,
    fontweight,
    bgcolor,
    type,
    text,
    disabled,
    height,
    onClick,
    form,
}) => {
    return (
        <button
            className={`${style.button} ${style[buttonType]} ${style[buttonVariant]}`}
            style={{
                minWidth: minWidth,
                width: width,
                height: height,
                padding: padding,
                margin: margin,
                fontSize: fontsize,
                fontWeight: fontweight,
                backgroundColor: bgcolor,
            }}
            type={type}
            disabled={disabled}
            onClick={onClick}
            form={form}
        >
            {text}
        </button>
    );
};
Button.defaultProps = {
    text: "Click Here !",
    buttonType: "primary",
    buttonVariant: "contained",
    type: "button",
    minWidth: "7.5rem",
    disabled: false,
    form: "",
};

export const ToggleButton = ({
    buttonType,
    buttonVariant,
    padding,
    margin,
    width,
    minWidth,
    fontsize,
    fontweight,
    bgcolor,
    type,
    text,
    disabled,
    height,
    onClick,
    form,
}) => {
    return (
        <button
            className={`${style.button} ${style[buttonType]} ${style[buttonVariant]}`}
            style={{
                minWidth: minWidth,
                width: width,
                height: height,
                padding: padding,
                margin: margin,
                fontSize: fontsize,
                fontWeight: fontweight,
                backgroundColor: bgcolor,
            }}
            type={type}
            disabled={disabled}
            onClick={onClick}
            form={form}
        >
            <span className={style.toggleBtn}>
                <span className={style.selected}>Published</span>
                <span className={status === "Offline" && style.selected}>
                    Draft
                </span>
            </span>
        </button>
    );
};
ToggleButton.defaultProps = {
    text: "Click Here !",
    buttonType: "primary",
    buttonVariant: "contained",
    type: "button",
    minWidth: "14rem",
    disabled: false,
    form: "",
};
/* End of  Button */
