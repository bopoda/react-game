import React, {useEffect} from "react";

interface Props {
    secondsSpent: number
    setSecondsSpent: (seconds: number) => void
    finished: boolean
}

function getMinutes(secondsSpent: number): string {
    if (secondsSpent < 60) {
        return "00";
    }

    const minutes = Math.floor(secondsSpent / 60);
    if (minutes >= 100) {
        return minutes.toString();
    }

    return ("0" + minutes).slice(-2);
}

function getSeconds(secondsSpent: number): string {
    return ("0" + secondsSpent % 60).slice(-2);
}

export function getHumanReadableTimerTime(secondsSpent: number) {
    return getMinutes(secondsSpent) + ":" + getSeconds(secondsSpent);
}

function Timer(props: Props) {
    const {secondsSpent} = props;

    useEffect(() => {
        if (!props.finished) {
            const timer = setTimeout(() => {
                console.log('timer +1');
                props.setSecondsSpent(secondsSpent + 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    });

    return (
        <span className="timer">
            {getHumanReadableTimerTime(props.secondsSpent)}
        </span>
    )
}

export default Timer;