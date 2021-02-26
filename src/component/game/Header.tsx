import React from "react";
import "./Header.scss";

function Header() {
   return (
       <header className="site-header">
           <div className="content-wrapper clearfix__">
               <a href="/" className="logo-sudoku">{' '}</a>
           </div>
       </header>
   )
}

export default Header;