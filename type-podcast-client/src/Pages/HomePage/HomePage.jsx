import { Link } from "react-router-dom";
import "./HomePage.scss"

export default function HomePage(){
    return(
        <>
        <Link to={"/play"} className="play-link">Play</Link>
        </>
    )
}