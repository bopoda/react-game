import React, {SyntheticEvent, useEffect, useState} from "react";
import GameCell from "./GameCell";
import "./gamestyle.scss";
import {CellConfigInterface, CellValueType, CellSolutionType} from "./types";
import Header from "./Header";
import Footer from "./Footer";
import getRandomLevel from "../api/levelApi";

const FIELD_SIZE = 9;

function Game() {
    const [cells, setCells] = useState<Array<Array<CellConfigInterface>>>([]);
    const [selectedCell, setSelectedCell] = useState<CellConfigInterface>();
    const [showMistakes, setShowMistakes] = useState<boolean>(false);
    const [showNewGameMenu, setShowNewGameMenu] = useState<boolean>(false);

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
        document.addEventListener('click', onDocumentClick);
        return () => {
            document.removeEventListener('click', onDocumentClick);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            startGame();
        }, 500);

        return () => {
            clearTimeout(timer);
        }
    }, []);

    function startGame(): void {
        const cellsString = localStorage.getItem('CELLS');
        if (cellsString) {
            console.log('Start saved game...');
            const savedCells = JSON.parse(cellsString) as CellConfigInterface[][];

            setCells(savedCells);
        } else {
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
    }

    function onDocumentClick(e: MouseEvent): void {
        if (!e.target) {
            return;
        }

        const el = e.target as Element;
        if (!el.classList.contains('new-game-button')) {
            setShowNewGameMenu(false);
        }
    }

    function onKeydown(e: KeyboardEvent): void {
        console.log('key pressed:', e.key);

        if (!selectedCell) {
            console.log('No cell selected when key pressed:', e.key);
            return;
        }

        if (!e.code.match(/^Digit/)) {
            return;
        }

        const newValue = parseInt(e.key) as CellValueType;

        changeCellValue(newValue);
    }

    function changeCellValue(newValue: CellValueType): void {
        if (selectedCell && selectedCell.value !== newValue && !selectedCell.prefilled) {
            const newCells = JSON.parse(JSON.stringify(cells));
            newCells[selectedCell.row][selectedCell.col].value = newValue;
            setCells(newCells);
            localStorage.setItem("CELLS", JSON.stringify(newCells));
        }
    }

    //TODO: finish if enough time
    function highlightConflicts() {
    }

    function renderGameRow(rowNumber: number): React.ReactNode {
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

    function newGameClick(): void {
        setShowNewGameMenu(!showNewGameMenu);
    }

    function onCancel(e: SyntheticEvent): void {
        e.preventDefault();
    }

    function onRestart(e: SyntheticEvent): void {
        e.preventDefault();

        localStorage.removeItem('CELLS');

        window.document.location.reload();
    }

    return (
        <div>
            <Header/>
            <div className="content-wrapper site-content-wrapper clearfix__">
                <div className="site-content">
                    <div className="sudoku-wrapper">
                        <div className="game-info-wrapper flex-wrapper">
                            <div className="check-mistakes-wrapper">
                                <label className="check-mistakes">
                                    <span className="label-text">Show Mistakes</span>
                                    <span className="switch">
                                        <input type="checkbox"
                                               checked={showMistakes}
                                               onChange={() => setShowMistakes(!showMistakes)}
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
                                            return renderGameRow(rowNumber);
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="game-controls-wrapper">
                                <nav>
                                    <div className="new-game-button-wrapper">
                                        <div className="button new-game-button" onClick={newGameClick}>New Game</div>
                                        {showNewGameMenu &&
                                        <div className="new-game-menu">
                                            <div className="tooltip-arrow"> </div>
                                            <ul className="select-difficulty">
                                                <li className="lost-progress-label">
                                                    Current game progress will be lost
                                                </li>
                                                <li><a href="/#"
                                                       className="new-game-menu-new"
                                                       onClick={onRestart}
                                                >New Game</a></li>
                                                <li><a href="/#"
                                                       className="new-game-menu-restart"
                                                       onClick={onRestart}
                                                >Restart</a></li>
                                                <li><a href="/#"
                                                       className="new-game-menu-cancel"
                                                       onClick={onCancel}
                                                >Cancel</a></li>
                                            </ul>
                                        </div>
                                        }
                                    </div>
                                    <input type="button" value="Solve all automatically" onClick={solveAllCells} />
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Game;