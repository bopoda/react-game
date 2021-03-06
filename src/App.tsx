import React from 'react';
import Game from "./component/game";
import Header from "./component/header";
import Footer from "./component/footer";
import SoundsMusic from "./component/sound/SoundsMusic";

function App() {
    return (
        <>
            <Header/>
            <div className="content-wrapper site-content-wrapper" id="site-content-wrapper">
                <div className="site-content">
                    <Game/>
                </div>
                <aside>
                    <SoundsMusic/>
                </aside>
            </div>
            <Footer/>
        </>
    );
}

export default App;
