import React from "react";
import Cell from "./Cell";

const FIELD_SIZE = 9;

function Game() {
    function range(start: number, end: number): number[] {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }

        return result;
    }

    function renderGameRow(): React.ReactNode {
        return (
            <tr className="game-row">
                {range(1, FIELD_SIZE).map(i => {
                    return <Cell cellValue={i}/>
                })}
            </tr>
        )
    }

    return (
        <table className="game-table">
            <tbody>
            {range(1, FIELD_SIZE).map(rowNumber => {
                return renderGameRow();
            })}
            </tbody>
        </table>
    )
}

export default Game;