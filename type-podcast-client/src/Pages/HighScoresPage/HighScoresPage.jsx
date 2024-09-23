/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import HallOfFameCard from '../../components/HallOfFameCard/HallOfFameCard'
import './HighScoresPage.scss'
import axios from "axios";
import Header from '../../components/Header/Header';

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
        <div>
            <Header />
            <div className='hof-cont'>
                <div className='hof-cont__border-box'>
                    <p className='hof-cont__title'>WELCOME TO THE HALL OF FAME</p>
                    <div className='hof-cont__screen'>
                        {
                            scores.map((player) => (
                                <HallOfFameCard key={player.id} name={player.name} score={player.score} />
                            ))}

                    </div>
                </div>
            </div>
        </div>
    )
}