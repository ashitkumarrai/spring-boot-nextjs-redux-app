function Divider({ isVertical, length, thickness, margin }) {
    let styles = {
        backgroundColor: "#fff",
        alignSelf:"center",
        margin:margin
    };
    if (isVertical) {
        styles = {
            ...styles,
            height: length,
            width: thickness,
        };
    } else {
        styles = {
            ...styles,
            height: thickness,
            width: length,
        };
    }

    return <div style={styles}></div>;
}
Divider.defaultProps = {
    isVertical: false,
    length:"1rem",
    thickness:"1px"
};
export default Divider;
