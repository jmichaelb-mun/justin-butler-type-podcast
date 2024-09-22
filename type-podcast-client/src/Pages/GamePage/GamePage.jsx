/* eslint-disable no-unused-vars */
import React from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";
import { useState, useCallback, useEffect } from 'react';
import './GamePage.scss'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import LevelCompleteModal from '../../components/LevelCompleteModal/LevelCompleteModal';



function GamePage() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [type, setType] = useState();
    const [isType, setIsType] = useState(false);
    const [health, setHealth] = useState(5);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const { unityProvider, addEventListener, removeEventListener } = useUnityContext({
        loaderUrl: "build/build.loader.js",
        dataUrl: "build/build.data",
        frameworkUrl: "build/build.framework.js",
        codeUrl: "build/build.wasm",
    });

    const handleSendType = useCallback((type) => {
        console.log(type);
        setIsType(true);
        setType(type);
    }, []);

    const handleGameOver = useCallback((score) => {
        setIsGameOver(true);
        setScore(score);
        navigate("/loss", { replace: true });
    }, []);

    const handleUpdateHealthScore = useCallback((health, score) => {
        setHealth(health);
        setScore(score);
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

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);

    };

    return (
        <section className='game-cont'>
            {isType === true && (
                <div className='player-info'>
                    <p>{`Player Type: ${type}`}</p>
                    <div className='health-bar'>
                        <p>
                            {`HP: `}
                        </p>
                        <progress value={health} max={5} />
                    </div>
                    <p>{`Score ${score}`}</p>
                </div>
            )}
            <Unity unityProvider={unityProvider} />
            {isGameOver === true && (
                { handleGameOver }
            )}
            <button
                className="warehouses__delete-btn"
                onClick={() => handleOpenModal()}
            >hello</button>
            {isOpen && (
                <LevelCompleteModal
                    onClose={handleCloseModal}
                    isOpen={isOpen}
                />
            )}
        </section>
    )
}

export default GamePage