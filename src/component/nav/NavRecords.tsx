import React from "react";
import {getHumanReadableTimerTime} from "../game/Timer";

interface Props {
    records: number[]
}

function NavRecords(props: Props) {
    return (
        <div className="records-wrapper">
            <p>Last 10 Records:</p>
            {props.records.length ?
            <ul>
                {props.records.map(function (seconds: number, i: number) {
                    return (
                        <li key={i}>
                            {getHumanReadableTimerTime(seconds)}
                        </li>
                    );
                })}
            </ul>
                : null
            }
        </div>
    )
}

export default NavRecords;