import Image from "next/image";
import style from "./avatar.module.css";

//Assets

function Avatar({ imgUrl, userName ,background,color,isWholeText,fontWeight}) {
    if(!isWholeText){
        return (
            <div className={style.avatarBorder} style={{background:background,color:color,borderColor:color,fontWeight:fontWeight}}>
                {" "}
                {imgUrl == null ? (
                    userName[0]/* .toUpperCase() */
                ) : (
                    <Image
                        src={imgUrl}
                        alt=""
                        layout="fill"
                        objectFit="contain"
                    />
                )}
            </div>
        );
    }else{
        return (
            <div className={style.avatarBorder} style={{background:background,color:color,borderColor:color,fontWeight:fontWeight}}>
                {" "}
                {imgUrl == null ? (
                    userName/* .toUpperCase() */
                ) : (
                    <Image
                        src={imgUrl}
                        alt=""
                        layout="fill"
                        objectFit="contain"
                    />
                )}
            </div>
        );
    }
    
}

Avatar.defaultProps = {
    userName: "Avatar",
    imgUrl: null,
};

export default Avatar;
