/* eslint-disable react/prop-types */
import "./LevelCompleteModal.scss";
import { TypeAnimation } from 'react-type-animation';

export default function LevelCompleteModal({ isOpen, onClose, saveGame, score}) {

    return (
        <div className={`modal-wrap ${isOpen ? 'modal-wrap--open' : ''}`}>
            <div className="modal-wrap__content">
                <div className="modal-wrap-text">
                    <div className="modal-wrap__exit">
                    </div>
                    <TypeAnimation
                        sequence={[`You completed the level with a score of ${score}. do you wish to:`]}
                        speed={80}
                        className="modal-wrap__text--body" />
                </div>

                <div className="modal-wrap__btns">
                    <button onClick={saveGame} className="modal-wrap__btns--cancel">Save & Quit</button>
                    <button onClick={onClose} className="modal-wrap__btns--cancel">Continue</button>
                </div>
            </div>
        </div>
    );
}