import React, { useState } from "react";
import style from "./quizform.module.css";

//Assets
import { RiCheckboxBlankCircleLine, RiCloseFill } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";

const Option = ({
    index,
    activeIndex,
    setActiveIndex,
    optionData,
    correctOption,
}) => {
    const findIndex = correctOption.find((s) => s === index);
   /*  const checkAns = (index) => {
        setActiveIndex(index);
    }; */
    return (
        <span className={style.option} /* onClick={() => checkAns(index)} */>
            {findIndex != null ? (
                <AiFillCheckCircle fill="#0BDA51" />
            ) : (
                <RiCheckboxBlankCircleLine />
            )}

            <div>{optionData}</div>
        </span>
    );
};
const OptionForm = ({ index, correctOption, setCorrectOption }) => {
    const findIndex = correctOption.find((s) => s === index);

    return (
        <span className={style.option}>
            <span onClick={() => setCorrectOption(index)}>
                {findIndex != null ? (
                    <AiFillCheckCircle fill="#0BDA51" />
                ) : (
                    <RiCheckboxBlankCircleLine />
                )}
            </span>

            <input type="text" placeholder="Option" />
            <span className={style.rmOption}>
                <RiCloseFill />
            </span>
        </span>
    );
};
export default function QuizForm({ data }) {
    const [correctIndex, setCorrectIndex] = useState(null);
    return (
        <div className={style.container}>
            <div className={style.strip}></div>
            <div className={style.inputForm}>
                <span className={style.question}>
                    {data == null ? (
                        <textarea type="text" placeholder="Question" />
                    ) : (
                        <div>{data.question}</div>
                    )}
                </span>
                <span className={style.options}>
                    {data != null ? (
                        data.options.map((opt, k) => (
                            <Option
                                key={k}
                                index={k}
                                optionData={opt}
                                activeIndex={correctIndex}
                                setActiveIndex={setCorrectIndex}
                                correctOption={data.correctAnswer}
                            />
                        ))
                    ) : (
                        <>
                            <OptionForm
                                index={1}
                                correctOption={correctOption}
                                setCorrectOption={setCorrectOption}
                            />
                            <OptionForm
                                index={2}
                                correctOption={correctOption}
                                setCorrectOption={setCorrectOption}
                            />
                            <OptionForm
                                index={3}
                                correctOption={correctOption}
                                setCorrectOption={setCorrectOption}
                            />
                            <OptionForm
                                index={4}
                                correctOption={correctOption}
                                setCorrectOption={setCorrectOption}
                            />
                        </>
                    )}
                </span>
            </div>
        </div>
    );
}
