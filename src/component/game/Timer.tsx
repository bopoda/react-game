import React, {useEffect, useState} from "react";

interface Props {
    secondsSpent: number
    setSecondsSpent: (seconds: number) => void
}

function Timer(props: Props) {
    const {secondsSpent} = props;

    function getMinutes(): string {
        if (secondsSpent < 60) {
            return "00";
        }

        const minutes = Math.floor(secondsSpent / 60);
        if (minutes >= 100) {
            return minutes.toString();
        }

        return ("0" + minutes).slice(-2);
    }

    function getSeconds(): string {
        return ("0" + secondsSpent % 60).slice(-2);
    }

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         console.log('timer +1');
    //         props.setSecondsSpent(secondsSpent + 1);
    //     }, 100);
    //     return () => clearTimeout(timer);
    // });

    return (
        <span className="timer">
            {getMinutes()}:{getSeconds()}
        </span>
    )
}

export default Timer;