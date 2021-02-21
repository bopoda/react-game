import React from "react";
import {CellConfigInterface} from "./types";

interface Props {
    cellConfig: CellConfigInterface|null
    selected: boolean
    setSelectedCell: any
}

function GameCell(props: Props) {
    const {cellConfig} = props;

    function onClick(): void {
        console.log('clicked cell:', cellConfig);
        if (null === cellConfig) {
            return;
        }

        props.setSelectedCell(cellConfig);
    }

    return (
        <td className={"game-cell" + (props.selected ? " cell-selected" : "")} onClick={onClick}>
            <div className={"cell-value" + (cellConfig?.prefilled ? " cell-prefilled" : "")}>
                {cellConfig && cellConfig.value > 0 ? cellConfig.value : ''}
            </div>
        </td>
    )
}

export default GameCell;