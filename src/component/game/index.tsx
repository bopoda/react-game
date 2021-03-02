import React, {useEffect, useState} from "react";
import NavNewGame from "../nav/NavNewGame";
import {CellConfigInterface, CellSolutionType, CellValueType} from "./types";
import getRandomLevel from "../api/levelApi";
import GameCell from "./GameCell";
import "./gamestyle.scss";
import NavHotkeys from "../nav/NavHotkeys";

const FIELD_SIZE = 9;

function Game() {
    const savedCells = JSON.parse(localStorage.getItem('CELLS') as string);
    const savedShowMistakes = localStorage.getItem('SHOW_MISTAKES') === "1";

    const [cells, setCells] = useState<Array<Array<CellConfigInterface>>>(savedCells);
    const [selectedCell, setSelectedCell] = useState<CellConfigInterface>();
    const [showMistakes, setShowMistakes] = useState<boolean>(savedShowMistakes);

    function range(start: number, end: number): number[] {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }

        return result;
    }

    function isSelectedCell(cellConfig: CellConfigInterface): boolean {
        return selectedCell !== undefined
            && selectedCell.row === cellConfig.row
            && selectedCell.col === cellConfig.col;
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeydown);
        return () => {
            document.removeEventListener('keydown', onKeydown);
        }
        // eslint-disable-next-line
    }, [selectedCell]);

    useEffect(() => {
        if (cells) {
            return;
        }

        const timer = setTimeout(() => {
            startNewGame();
        }, 500);

        return () => {
            clearTimeout(timer);
        }
        // eslint-disable-next-line
    }, []);

    function startNewGame(): void {
        const levelApiResponse = getRandomLevel();
        console.log('Start new game...', levelApiResponse);

        const cellsTemp = new Array<Array<CellConfigInterface>>();
        let index = 0;
        for (let row = 0; row <= FIELD_SIZE - 1; row++) {
            cellsTemp[row] = new Array<CellConfigInterface>();
            for (let column = 0; column <= FIELD_SIZE - 1; column++) {
                cellsTemp[row][column] = {
                    value: parseInt(levelApiResponse.mission[index]) as CellValueType,
                    solution: parseInt(levelApiResponse.solution[index]) as CellSolutionType,
                    prefilled: levelApiResponse.mission[index] === levelApiResponse.solution[index],
                    row: row,
                    col: column
                }

                index++;
            }
        }

        setCells(cellsTemp);
    }

    function onKeydown(e: KeyboardEvent): void {
        console.log('key pressed:', e.key);

        if (!selectedCell) {
            console.log('No cell selected when key pressed:', e.key);
            return;
        }

        switch (e.key) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                changeCurrentCellValue(parseInt(e.key) as CellValueType);
                break;

            case '0':
            case 'Backspace':
                changeCurrentCellValue(0 as CellValueType);
                break;

            default:
                //do nothing
                break;
        }
    }

    function changeCurrentCellValue(newValue: CellValueType): void {
        if (!selectedCell || selectedCell.prefilled) {
            return;
        }

        const newCells = JSON.parse(JSON.stringify(cells));
        newCells[selectedCell.row][selectedCell.col].value = newValue;
        setCells(newCells);
        localStorage.setItem("CELLS", JSON.stringify(newCells));
    }

    function solveAllCells() {
        const newCells = JSON.parse(JSON.stringify(cells));

        for (const row of newCells) {
            for (const cell of row) {
                cell.value = cell.solution;
            }
        }

        setCells(newCells);
    }

    function handleShowMistakesClick() {
        localStorage.setItem('SHOW_MISTAKES', showMistakes ? "0" : "1");
        setShowMistakes(!showMistakes);
    }

    return (
        <div className="sudoku-wrapper">
            <div className="game-info-wrapper flex-wrapper">
                <div className="check-mistakes-wrapper">
                    <label className="check-mistakes">
                        <span className="label-text">Show Mistakes</span>
                        <span className="switch">
                                    <input type="checkbox"
                                           checked={showMistakes}
                                           onChange={handleShowMistakesClick}
                                    />
                                </span>
                    </label>
                </div>
                {/*<div className="timer-wrapper"><span className="timer">25:41</span>*/}
                {/*</div>*/}
            </div>
            <div className="game-flex-wrapper">
                <div className="game-wrapper">
                    <div className="game">
                        <table className={"game-table" + (showMistakes ? " show-mistakes" : "")}>
                            <tbody>
                            {range(0, FIELD_SIZE - 1).map(rowNumber => {
                                return (
                                    <tr className="game-row" key={rowNumber}>
                                        {range(0, FIELD_SIZE - 1).map(columnNumber => {
                                            const cellConfig = cells ? cells[rowNumber][columnNumber] : null;
                                            return <GameCell cellConfig={cellConfig}
                                                             key={rowNumber.toString() + columnNumber.toString()}
                                                             selected={cellConfig ? isSelectedCell(cellConfig) : false}
                                                             setSelectedCell={setSelectedCell}
                                            />
                                        })}
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="game-controls-wrapper">
                    <nav>
                        <NavNewGame/>
                        <input type="button" value="Solve all automatically" onClick={solveAllCells} />
                        <NavHotkeys/>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Game;