/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./Header.scss"

function Header() {
    return (
        <header className="header">
            <Link to={'/'} className="header__title">
                <h1>THE TYPE PODCAST</h1>
            </Link>
            <div className="header__interact-bar">
                <Link to={'/play'} className="upload-link">
                    <button className="upload-btn">
                        PLAY
                    </button>
                </Link>
                <Link to={'/hall-of-fame'} className="upload-link">
                    <button className="upload-btn">
                        HOF
                    </button>
                </Link>
            </div>
        </header>
    );
}

export default Header;