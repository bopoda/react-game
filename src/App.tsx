import React from 'react';
import Game from "./component/game";
import Header from "./component/header";
import Footer from "./component/footer";

function App() {
    return (
        <>
            <Header/>
            <div className="content-wrapper site-content-wrapper">
                <div className="site-content">
                    <Game/>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default App;
