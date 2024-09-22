import { Link } from "react-router-dom";
import "./HomePage.scss"
import Header from "../../components/Header/Header";

export default function HomePage() {
    return (
        <>
            <Header />
            <div className="menu-cont">
                <Link to={"/play"} className="play-link">PLAY</Link>
                <Link to={"/hall-of-fame"} className="hof-link">HALL OF FAME</Link>
            </div>
        </>
    )
}