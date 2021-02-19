import React from "react";

interface Props {
    cellValue?: number
}

function GameCell(props: Props) {
    return (
        <td className="game-cell">
            <div className="cell-value">
                {props.cellValue}
            </div>
        </td>
    )
}

export default GameCell;