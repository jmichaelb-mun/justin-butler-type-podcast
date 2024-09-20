/* eslint-disable no-unused-vars */
import React from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";
import { useState, useCallback, useEffect } from 'react';
import './GamePage.scss'
import axios from "axios";

function GamePage() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState();
    const [type, setType] = useState();
    const [isType, setIsType] = useState(false);

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

    return (
        <>
            {isType === true && (
                <p>{`Player Type: ${type}`}</p>
            )}
            <Unity unityProvider={unityProvider} />
            {isGameOver === true && (
                <p>{`Game Over! You've scored ${score} points.`}</p>
            )}

        </>
    )
}

export default GamePage