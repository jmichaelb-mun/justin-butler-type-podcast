/* eslint-disable react/prop-types */
import "./GameRules.scss";


export default function GameRules({ isRulesOpen, onRulesClose, }) {

    return (
        <div className={`rules-wrap ${isRulesOpen ? 'rules-wrap--open' : ''}`}>
            <div className="rules-wrap__content">
                <div className="rules-wrap__text-cont">
                    <p className="rules-wrap__text">You can move around using the WASD keys on your keyboard</p>
                    <p className="rules-wrap__text">The objective of the game is to walk into the type that your current type has the best matchup into.</p> 
                    <p className="rules-wrap__text">For example if your current type is water, and the 3 displayed options are Fire, Grass, and Electric you will want to walk over the fire tile.</p>
                    <p className="rules-wrap__text">All current info about the player including type, HP and score can be found at the top of the game window.</p>
                </div>

                <div className="rules-wrap__btns">
                    <button onClick={onRulesClose} className="rules-wrap__btns--cancel">Continue</button>
                </div>
            </div>
        </div>
    );
}