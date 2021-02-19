import React from "react";
import GameCell from "./GameCell";
import "./gamestyle.scss";

const FIELD_SIZE = 9;

function Game() {
    function range(start: number, end: number): number[] {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }

        return result;
    }

    function renderGameRow(rowNumber: number): React.ReactNode {
        return (
            <tr className="game-row" key={rowNumber}>
                {range(1, FIELD_SIZE).map(i => {
                    return <GameCell cellValue={i} key={rowNumber.toString() + i.toString()}/>
                })}
            </tr>
        )
    }

    return (
        <div className="game-wrapper">
            <div className="game">
                <table className="game-table">
                    <tbody>
                    {range(1, FIELD_SIZE).map(rowNumber => {
                        return renderGameRow(rowNumber);
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Game;