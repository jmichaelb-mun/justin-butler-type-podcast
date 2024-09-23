/* eslint-disable no-unused-vars */
import React from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";
import { useState, useCallback, useEffect } from 'react';
import './GamePage.scss'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import LevelCompleteModal from '../../components/LevelCompleteModal/LevelCompleteModal';
import Header from "../../components/Header/Header.jsx"
import GameRules from '../../components/GameRules/GameRules.jsx';


function GamePage() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [newScore, setNewScore] = useState(0);
    const [type, setType] = useState();
    const [isType, setIsType] = useState(false);
    const [typeImage, setTypeImage] = useState();
    const [newHealth, setNewHealth] = useState(5);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isRulesOpen, setIsRulesOpen] = useState(false);
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

    const handleOpenRules = () => {
        setIsRulesOpen(true);
    };
    const handleCloseRules = () => {
        setIsRulesOpen(false);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        sendMessage("PlayerCharacter", "ReloadScene");
    };

    const handleSaveGame = async () => {
        try {
            await axios.post("http://localhost:8080/score", { name: "May", score: newScore });
        } catch (error) {
            alert(`ERROR: ${error.response.data}`, error);
        }
        setIsOpen(false);
        navigate("/", { replace: true });
    }

    return (
        <>
            <Header />
            <div className='game-page'>

                <section className='game-cont'>
                    {isType === true && (
                        <div className='player-info'>
                            <div className='player-info__type-cont'>
                                <p className='player-info__text'>{`Type: `}</p>
                                <img className="player-info__type" src={`http://localhost:8080/images/${type}.png`} alt="" />
                            </div>
                            <div className='health-bar'>
                                <p className='player-info__text'>
                                    {`HP: `}
                                </p>
                                <progress value={newHealth} max={5} />
                            </div>
                            <p className='player-info__text'>{`Score: ${newScore}`}</p>
                        </div>
                    )}
                    <Unity unityProvider={unityProvider} style={{
                        width: '100%',
                        height: '100%',
                    }} />
                    <button className='rules-button' onClick={handleOpenRules}>?</button>
                    {isGameOver === true && (
                        { handleGameOver }
                    )}
                    {isOpen && (
                        <LevelCompleteModal
                            onClose={handleCloseModal}
                            isOpen={isOpen}
                            saveGame={handleSaveGame}
                            score={newScore}
                        />
                    )}
                    {isRulesOpen && (
                        <GameRules isRulesOpen={isRulesOpen} onRulesClose={handleCloseRules} />
                    )}
                </section>
            </div>

        </>
    )
}

export default GamePage