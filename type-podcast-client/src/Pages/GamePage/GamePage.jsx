/* eslint-disable no-unused-vars */
import React from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";
import { useState, useCallback, useEffect } from 'react';
import axios from "axios";

function GamePage() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState();

    const { unityProvider, addEventListener, removeEventListener } = useUnityContext({
        loaderUrl: "build/builds.loader.js",
        dataUrl: "build/builds.data",
        frameworkUrl: "build/builds.framework.js",
        codeUrl: "build/builds.wasm",
    });

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

    return (
        <>
            <Unity unityProvider={unityProvider} />
            {isGameOver === true && (
                <p>{`Game Over! You've scored ${score} points.`}</p>
            )}
        </>
    )
}

export default GamePage