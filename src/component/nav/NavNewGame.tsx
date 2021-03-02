import React, {SyntheticEvent, useEffect, useState} from "react";

function NavNewGame() {
    const [showNewGameMenu, setShowNewGameMenu] = useState<boolean>(false);

    useEffect(() => {
        document.addEventListener('click', onDocumentClick);
        return () => {
            document.removeEventListener('click', onDocumentClick);
        }
    }, []);

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

    function onDocumentClick(e: MouseEvent): void {
        if (!e.target) {
            return;
        }

        const el = e.target as Element;
        if (!el.classList.contains('new-game-button')) {
            setShowNewGameMenu(false);
        }
    }

    return (
        <div className="new-game-button-wrapper">
            <div className="button new-game-button" onClick={newGameClick}>New Game</div>
            {showNewGameMenu &&
            <div className="new-game-menu">
                <div className="tooltip-arrow">{' '}</div>
                <ul>
                    <li className="lost-progress-label">
                        Current game progress will be lost
                    </li>
                    <li><a href="/#"
                           className="new-game-menu-new"
                           onClick={onRestart}
                    >New Game</a></li>
                    <li><a href="/#"
                           className="new-game-menu-cancel"
                           onClick={onCancel}
                    >Cancel</a></li>
                </ul>
            </div>
            }
        </div>
    )
}

export default NavNewGame;