import React, {useEffect, useRef, useState} from "react";
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
const SOLVE_AUTOMATICALLY_CELL_TIMEOUT = 700;

function Game() {
    const [records, setRecords] = useState<number[]>([]);
    const [finished, setFinished] = useState<boolean>(false);
    const [cells, setCells] = useState<Array<Array<CellConfigInterface>>>([]);
    const [selectedCell, setSelectedCell] = useState<CellConfigInterface>();
    const [showMistakes, setShowMistakes] = useState<boolean>(false);
    const [secondsSpent, setSecondsSpent] = useState<number>(0);

    const cellsRef = useRef(cells);
    cellsRef.current = cells;

    useEffect(() => {
        document.addEventListener('keydown', onKeydown);
        return () => {
            document.removeEventListener('keydown', onKeydown);
        }
        // eslint-disable-next-line
    }, [selectedCell]);

    useEffect(() => {
        const savedRecords = localStorage.getItem('RECORDS') as string;
        if (savedRecords) {
            setRecords(JSON.parse(savedRecords));
        }

        const savedSecondsSpent = localStorage.getItem('SECONDS_SPENT') as string;
        if (savedSecondsSpent) {
            setSecondsSpent(parseInt(savedSecondsSpent));
        }

        const savedCells = JSON.parse(localStorage.getItem('CELLS') as string);
        if (savedCells) {
            setCells(savedCells);
        }
        const savedShowMistakes = localStorage.getItem('SHOW_MISTAKES') === "1";
        setShowMistakes(savedShowMistakes);

        if (savedCells) {
            if (isAllCellsDone(savedCells)) {
                setFinished(true);
            }

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
        localStorage.setItem('SHOW_MISTAKES', showMistakes ? "1" : "0");
        localStorage.setItem('SECONDS_SPENT', secondsSpent.toString());
        localStorage.setItem("CELLS", JSON.stringify(cells));


        if (!finished && isAllCellsDone(cells)) {
            onGameFinished();
        }
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
    }

    function saveRecord(): void {
        records.unshift(secondsSpent);

        setRecords(records.slice(0, MAX_COUNT_RECORDS));
    }

    function isAllCellsDone(cells: Array<Array<CellConfigInterface>>): boolean {
        if (!cells.length) {
            return false;
        }

        for (const row of cells) {
            for (const cell of row) {
                if (cell.value !== cell.solution) {
                    return false;
                }
            }
        }

        return true;
    }

    function getAndSelectRandomNotSolvedCell(cells: Array<Array<CellConfigInterface>>): CellConfigInterface|null {
        const notSolvedCells = [];

        for (const row of cells) {
            for (const cell of row) {
                if (!cell.prefilled && cell.value !== cell.solution) {
                    notSolvedCells.push(cell);
                }
            }
        }

        if (!notSolvedCells.length) {
            return null;
        }

        const cell = notSolvedCells[Math.floor(Math.random() * notSolvedCells.length)];
        setSelectedCell(cell);

        return cell;
    }

    function solveExactlyOneCell(cells: Array<Array<CellConfigInterface>>): void {
        const cell = getAndSelectRandomNotSolvedCell(cells);

        if (!cell) {
            return;
        }

        setTimeout(() => {
            const newCells = JSON.parse(JSON.stringify(cells));

            //emulate wrong numbers filled
            if (randomIntFromInterval(1, 6) === 6) {
                newCells[cell.row][cell.col].value = randomIntFromInterval(1, 9);
                setCells(newCells);

                newCells[cell.row][cell.col].value = cell.solution;
                setCells(newCells);
            } else if (randomIntFromInterval(1, 7) === 7) {
                newCells[cell.row][cell.col].value = randomIntFromInterval(1, 9);
                setCells(newCells);
            } else {
                newCells[cell.row][cell.col].value = cell.solution;
                setCells(newCells);
            }

        }, SOLVE_AUTOMATICALLY_CELL_TIMEOUT / randomIntFromInterval(2, 5));
    }

    function randomIntFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function solveAutomaticallyStepByStep(): void {
        if (finished) {
            alert('The game is already solved. Click Start New Game or Restart.');
            return;
        }

        setTimeout(() => {
            const newCells = JSON.parse(JSON.stringify(cellsRef.current));

            solveExactlyOneCell(newCells);

            if (!isAllCellsDone(newCells)) {
                solveAutomaticallyStepByStep();
            }
        }, SOLVE_AUTOMATICALLY_CELL_TIMEOUT);
    }

    function onGameFinished(): void {
        localStorage.removeItem('CELLS');
        localStorage.removeItem('SECONDS_SPENT');
        setFinished(true);
        alert("Congrats! Your score is " + getHumanReadableTimerTime(secondsSpent) + ". You can start new game.");
        saveRecord();
    }

    function handleShowMistakesClick() {
        setShowMistakes(!showMistakes);
    }

    function setTimerSecondsSpent(secondsSpent: number) {
        setSecondsSpent(secondsSpent);
    }

    function fullScreen(): void {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    function restartCells(): void {
        const newCells = JSON.parse(JSON.stringify(cells));

        for (const row of newCells) {
            for (const cell of row) {
                if (!cell.prefilled) {
                    cell.value = 0;
                }
            }
        }

        setCells(newCells);
        setTimerSecondsSpent(0);
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
                        <table className={"game-table" + (showMistakes ? " show-mistakes" : "") + (finished ? " game-finished" : "")}>
                            <tbody>
                            {range(0, FIELD_SIZE - 1).map(rowNumber => {
                                return (
                                    <tr className="game-row" key={rowNumber}>
                                        {range(0, FIELD_SIZE - 1).map(columnNumber => {
                                            const cellConfig = cells.length ? cells[rowNumber][columnNumber] : null;
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
                        <NavNewGame restartCells={restartCells} />
                        <input type="button" value="Solve all automatically" onClick={solveAutomaticallyStepByStep} />
                        <NavHotkeys/>
                        <NavRecords records={records}/>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Game;