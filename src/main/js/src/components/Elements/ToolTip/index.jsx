import style from "./tooltip.module.css";
//components

export default function ToolTip({ content, children }) {
    return (
        <div className={style.container} tt-data={content}>
            {children}
        </div>
    );
}
ToolTip.defaultProps = {
    content: "Hover Me!",
};
