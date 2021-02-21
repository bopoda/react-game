import React, {useEffect, useState} from "react";
import GameCell from "./GameCell";
import "./gamestyle.scss";
import {CellConfigInterface} from "./types";

const FIELD_SIZE = 9;
const GAME_MISSION = "970000600201509034830040010000402000706050002052038000500817006620394051000060403";
const GAME_SOLUTION = "974123685261589734835746219319472568786951342452638197543817926627394851198265473";

function Game() {
    const [cells, setCells] = useState<Array<Array<CellConfigInterface>>>([]);
    const [selectedCell, setSelectedCell] = useState<CellConfigInterface>();

    function range(start: number, end: number): number[] {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }

        return result;
    }

    function selectCell(cellConfig: CellConfigInterface) {
        setSelectedCell(cellConfig);
    }

    function isSelectedCell(cellConfig: CellConfigInterface): boolean {
        return selectedCell !== undefined
            && selectedCell.row === cellConfig.row
            && selectedCell.col === cellConfig.col;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            startGame();
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    function startGame(): void {
        const cellsTemp = new Array<Array<CellConfigInterface>>();
        let index = 0;
        for (let row = 0; row <= FIELD_SIZE - 1; row++) {
            cellsTemp[row] = new Array<CellConfigInterface>();
            for (let column = 0; column <= FIELD_SIZE - 1; column++) {
                cellsTemp[row][column] = {
                    value: parseInt(GAME_MISSION[index]),
                    solution: parseInt(GAME_SOLUTION[index]),
                    prefilled: GAME_MISSION[index] === GAME_SOLUTION[index],
                    row: row,
                    col: column
                }

                index++;
            }
        }

        setCells(cellsTemp);
    }

    function renderGameRow(rowNumber: number): React.ReactNode {
        return (
            <tr className="game-row" key={rowNumber}>
                {range(0, FIELD_SIZE - 1).map(columnNumber => {
                    const cellConfig = cells.length ? cells[rowNumber][columnNumber] : null;
                    return <GameCell cellConfig={cellConfig}
                                     key={rowNumber.toString() + columnNumber.toString()}
                                     selected={cellConfig ? isSelectedCell(cellConfig) : false}
                                     selectCell={selectCell}
                    />
                })}
            </tr>
        )
    }

    return (
        <div className="game-wrapper">
            <div className="game">
                <table className="game-table">
                    <tbody>
                    {range(0, FIELD_SIZE - 1).map(rowNumber => {
                        return renderGameRow(rowNumber);
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Game;