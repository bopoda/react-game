import React, {useEffect, useState} from "react";
import NavNewGame from "../nav/NavNewGame";
import {CellConfigInterface, CellSolutionType, CellValueType} from "./types";
import getRandomLevel from "../api/levelApi";
import GameCell from "./GameCell";
import "./gamestyle.scss";
import NavHotkeys from "../nav/NavHotkeys";
import Timer, {getHumanReadableTimerTime} from "./Timer";
import NavRecords from "../nav/NavRecords";

const FIELD_SIZE = 9;
const MAX_COUNT_RECORDS = 10;

function Game() {
    const savedCells = JSON.parse(localStorage.getItem('CELLS') as string);
    const savedShowMistakes = localStorage.getItem('SHOW_MISTAKES') === "1";
    const savedSecondsSpent = localStorage.getItem('SECONDS_SPENT') as string;
    console.log('READ STORAGE look timer!');

    const [records, setRecords] = useState<number[]>([]);
    const [finished, setFinished] = useState<boolean>(false);
    const [cells, setCells] = useState<Array<Array<CellConfigInterface>>>(savedCells);
    const [selectedCell, setSelectedCell] = useState<CellConfigInterface>();
    const [showMistakes, setShowMistakes] = useState<boolean>(savedShowMistakes);
    const [secondsSpent, setSecondsSpent] = useState<number>(
        savedSecondsSpent !== null ? parseInt(savedSecondsSpent) : 0
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeydown);
        return () => {
            document.removeEventListener('keydown', onKeydown);
        }
        // eslint-disable-next-line
    }, [selectedCell]);

    useEffect(() => {
        const savedRecords = (localStorage.getItem('RECORDS') as string);
        if (savedRecords) {
            setRecords(JSON.parse(savedRecords));
        }

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

    useEffect(() => {
        localStorage.setItem('RECORDS', JSON.stringify(records));
    });

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
        localStorage.setItem("CELLS", JSON.stringify(cellsTemp));
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

        if (finished) {
            return;
        }

        const newCells = JSON.parse(JSON.stringify(cells));
        newCells[selectedCell.row][selectedCell.col].value = newValue;
        setCells(newCells);
        localStorage.setItem("CELLS", JSON.stringify(newCells));
        if (isAllCellsDone(newCells)) {
            onGameFinished();
        }
    }

    function saveRecord(): void {
        records.unshift(secondsSpent);

        setRecords(records.slice(0, MAX_COUNT_RECORDS));
    }

    function isAllCellsDone(cells: Array<Array<CellConfigInterface>>): boolean {
        for (const row of cells) {
            for (const cell of row) {
                if (cell.value !== cell.solution) {
                    return false;
                }
            }
        }

        return true;
    }

    function solveAllCells(): void {
        if (finished) {
            alert('The game is already solved');
            return;
        }

        const newCells = JSON.parse(JSON.stringify(cells));

        for (const row of newCells) {
            for (const cell of row) {
                cell.value = cell.solution;
            }
        }

        setCells(newCells);
        onGameFinished();
    }

    function onGameFinished(): void {
        localStorage.removeItem('CELLS');
        localStorage.removeItem('SECONDS_SPENT');
        setFinished(true);
        alert("Congrats! Your score is " + getHumanReadableTimerTime(secondsSpent) + ". You can start new game.");
        saveRecord();
    }

    function handleShowMistakesClick() {
        localStorage.setItem('SHOW_MISTAKES', showMistakes ? "0" : "1");
        setShowMistakes(!showMistakes);
    }

    function setTimerSecondsSpent(secondsSpent: number) {
        setSecondsSpent(secondsSpent);
        localStorage.setItem('SECONDS_SPENT', secondsSpent.toString());
    }

    function fullScreen(): void {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
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
                <div className="timer-wrapper">
                    <Timer secondsSpent={secondsSpent}
                           setSecondsSpent={setTimerSecondsSpent}
                           finished={finished}
                    />
                </div>
                <div className="full-screen-wrapper">
                    <input type="button"
                           value={document.fullscreenElement ? "Minimize" : "Full Screen"}
                           onClick={fullScreen}
                    />
                </div>
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
                        <NavRecords records={records}/>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Game;