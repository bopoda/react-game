import React from "react";
import rsSchoolLogo from "../../images/rs_school_js.svg";
import "./Footer.scss";

function Footer() {
    return (
        <footer className="site-footer">
            <div className="content-wrapper flex-wrapper">
                <div className="footer-item">
                    <a className="rs-logo" href="https://rs.school/js/">
                        <img src={rsSchoolLogo} alt="RS School"/>
                    </a>
                </div>
                <div className="footer-item">
                    <a href="https://github.com/bopoda">Eugene Yurkevich</a>, 2021
                </div>
                <div className="footer-item">
                    {' '}
                </div>
            </div>
        </footer>
    )
}

export default Footer;