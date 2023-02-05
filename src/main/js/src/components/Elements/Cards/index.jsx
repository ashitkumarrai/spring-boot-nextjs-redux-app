import style from "./cards.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
//componets
import { Button } from "../Buttons/Buttons";
import Avatar from "../Avatar";
//assets
import { MdShare } from "react-icons/md";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
//contexts
const hashtags = ["#nlp", "#chatbot", "#gpt3"];
export const PostCard = ({ data, isParent, isLiked, onClick }) => {
    return (
        <div
            className={[style.cardbody, style.batchCard].join(" ")}
            onClick={onClick}
        >
            <div className={style.tint}></div>
            <div className={style.upperDiv}>
                <div className={style.imageContainer}>a</div>
            </div>

            <div className={style.lowerDiv}>
                <div className={style.heading}>
                    <span className={style.postTitle}>
                        <p className={style.postName}>AKVCAT01</p>
                    </span>
                    <span className={style.controls}>
                        <span>
                            <MdShare />
                        </span>
                        <span>
                            {isLiked ? <IoMdHeart /> : <IoMdHeartEmpty />}
                        </span>
                    </span>
                </div>

                <p className={style.descText}>
                    We have trained a model called ChatGPT which interacts in a
                    conversational way. jbafbaj fbajfbajkb fkjbafkfk
                    afbjkabfabfkj b jabfkjb kjabfkab fjabfjk bbfa abf jbfakjsbf
                </p>
                <span className={style.hashTagRow}>
                    {hashtags.map((tag, i) => (
                        <p className={style.hashtagText} key={tag}>
                            {tag}
                        </p>
                    ))}
                </span>
                <div className={style.bottomRow}>
                    <Button
                        buttonType={"secondary"}
                        padding=".25rem 1.5rem"
                        height={"1.56rem"}
                    />
                    <Button
                        text={"Add to library"}
                        padding=".25rem 1.5rem"
                        height={"1.56rem"}
                    />
                </div>
            </div>
        </div>
    );
};
PostCard.defaultProps = {
    isLiked: false,
    onClick: () => {},
};
export const AddChallengeCard = ({ fn }) => {
    return (
        <div className={[style.cardbody, style.addcard].join(" ")} onClick={fn}>
            <span className={style.addcardcircle}>+</span>
        </div>
    );
};
