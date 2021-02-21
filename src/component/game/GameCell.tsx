import React from "react";
import {CellConfigInterface} from "./types";

interface Props {
    cellConfig: CellConfigInterface|null
}

function GameCell(props: Props) {
    const {cellConfig} = props;

    function onClick() {
        console.log('clicked cell:', cellConfig);
    }

    return (
        <td className="game-cell" onClick={onClick}>
            <div className="cell-value">
                {cellConfig && cellConfig.value > 0 ? cellConfig.value : ''}
            </div>
        </td>
    )
}

export default GameCell;