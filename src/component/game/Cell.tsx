import React from "react";

interface Props {
    cellValue?: number
}

function Cell(props: Props) {
    return (
        <td className="game-cell">{props.cellValue}</td>
    )
}

export default Cell;