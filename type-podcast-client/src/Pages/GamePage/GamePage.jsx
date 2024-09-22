/* eslint-disable no-unused-vars */
import React from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";
import { useState, useCallback, useEffect } from 'react';
import './GamePage.scss'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import LevelCompleteModal from '../../components/LevelCompleteModal/LevelCompleteModal';
import Header from "../../components/Header/Header.jsx"


function GamePage() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [newScore, setNewScore] = useState(0);
    const [type, setType] = useState();
    const [isType, setIsType] = useState(false);
    const [typeImage, setTypeImage] = useState();
    const [newHealth, setNewHealth] = useState(5);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [goNext, setGoNext] = useState(false);

    const { unityProvider, addEventListener, removeEventListener, sendMessage } = useUnityContext({
        loaderUrl: "Build/type-podcast-client.loader.js",
        dataUrl: "Build/type-podcast-client.data",
        frameworkUrl: "Build/type-podcast-client.framework.js",
        codeUrl: "Build/type-podcast-client.wasm",
    });

    const handleSendType = useCallback((type) => {
        console.log(type);
        setIsType(true);
        setType(type);

    }, []);

    const handleGameOver = useCallback(async (score) => {
        try {
            await axios.post("http://localhost:8080/score", { name: "green", score });
        } catch (error) {
            alert(`ERROR: ${error.response.data}`, error);
        }
        setIsGameOver(true);
        setNewScore(score);
        navigate("/loss", { replace: true });
    }, []);

    const handleUpdateHealthScore = useCallback((health, score) => {
        setNewHealth(health);
        setNewScore(score);
    }, []);

    const handleGoNext = useCallback((isFinished) => {
        setGoNext(isFinished);
        handleOpenModal();
    }, []);


    useEffect(() => {
        addEventListener("GameOver", handleGameOver);
        return () => {
            removeEventListener("GameOver", handleGameOver);
        };
    }, [addEventListener, removeEventListener, handleGameOver]);

    useEffect(() => {
        addEventListener("SendType", handleSendType);
        return () => {
            removeEventListener("SendType", handleSendType);
        };
    }, [addEventListener, removeEventListener, handleSendType]);

    useEffect(() => {
        addEventListener("UpdateHealthScore", handleUpdateHealthScore);
        return () => {
            removeEventListener("UpdateHealthScore", handleUpdateHealthScore);
        };
    }, [addEventListener, removeEventListener, handleUpdateHealthScore]);

    useEffect(() => {
        addEventListener("GoNext", handleGoNext);
        return () => {
            removeEventListener("GoNext", handleGoNext);
        };
    }, [addEventListener, removeEventListener, handleGoNext]);


    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        sendMessage("PlayerCharacter", "ReloadScene");
    };

    return (
        <>
            <Header />
            <section className='game-cont'>
                {isType === true && (
                    <div className='player-info'>
                        <div className='player-info__type-cont'>
                            <p>{`Type: `}</p>
                            <img className="player-info__type" src={`http://localhost:8080/images/${type}.png`} alt="" />
                        </div>
                        <div className='health-bar'>
                            <p>
                                {`HP: `}
                            </p>
                            <progress value={newHealth} max={5} />
                        </div>
                        <p>{`Score: ${newScore}`}</p>
                    </div>
                )}
                <Unity unityProvider={unityProvider} />
                {isGameOver === true && (
                    { handleGameOver }
                )}
                {isOpen && (
                    <LevelCompleteModal
                        onClose={handleCloseModal}
                        isOpen={isOpen}
                    />
                )}
            </section>
        </>
    )
}

export default GamePage