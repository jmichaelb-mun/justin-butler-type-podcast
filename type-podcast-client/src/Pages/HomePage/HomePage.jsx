import { Link } from "react-router-dom";
import "./HomePage.scss"
import Header from "../../components/Header/Header";

export default function HomePage(){
    return(
        <>
        <Header/>
        <Link to={"/play"} className="play-link">Play</Link>
        </>
    )
}