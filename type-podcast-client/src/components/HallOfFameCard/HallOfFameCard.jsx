/* eslint-disable no-unused-vars */
import React from 'react'
import './HallOfFameCard.scss'

export default function HallOfFameCard({ name, score }) {

    return (
        <>
            <div>
                <div className='hof-card'>
                    <h3>Name: {name}</h3>
                    <h3>Score: {score}</h3>
                </div>
                <h4 className='hof-card'>Hall Of Fame</h4>
            </div>
        </>
    )
}