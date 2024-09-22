/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import HallOfFameCard from '../../components/HallOfFameCard/HallOfFameCard'
import './HighScoresPage.scss'
import axios from "axios";

export default function HighScoresPage() {
    const [scores, setScores] = useState([]);
    useEffect(() => {
        if (!scores.length) {
            const getScores = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/score`)
                    let list = response.data
                    list = list.splice(0, 6);
                    setScores(list);
                } catch (err) {
                    console.log("ERROR: ", err);
                }
            }
            getScores();
        }
    }, [scores]);
    if (scores.length === 0) {
        return (
            <p>Loading...</p>
        )
    }
    return (
        <>
            <h1>THE TYPE PODCAST</h1>
            <div className='border-box'>
                <div className='hof-cont'>
                    {
                        scores.map((player) => (
                            <HallOfFameCard key={player.id} name={player.name} score={player.score} />
                        ))}

                </div>
            </div>
        </>
    )
}