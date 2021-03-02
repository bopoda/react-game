import React from "react";

function NavHotkeys() {
    return (
        <div className="hotkeys-wrapper">
            Hotkeys:
            <ul>
                <li><code>1-9</code> — fill selected cell</li>
                <li><code>0</code>, <code>Backspace</code> — erase selected cell</li>
            </ul>
        </div>
    )
}

export default NavHotkeys;