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

    function getCellClassName(): string {
        const className = ['game-cell'];

        if (props.selected) {
            className.push("cell-selected");
        }


        if (cellConfig && cellConfig.value > 0
        && cellConfig.value !== cellConfig.solution) {
            className.push("cell-mistake");
        }

        return className.join(' ');
    }

    return (
        <td className={getCellClassName()}
            onClick={onClick}
        >
            <div className={"cell-value" + (cellConfig?.prefilled ? " cell-prefilled" : "")}>
                {cellConfig && cellConfig.value > 0 ? cellConfig.value : ''}
            </div>
        </td>
    )
}

export default GameCell;