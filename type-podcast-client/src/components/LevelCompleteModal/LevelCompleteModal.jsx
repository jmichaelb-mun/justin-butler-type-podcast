/* eslint-disable react/prop-types */
import "./LevelCompleteModal.scss";
import { TypeAnimation } from 'react-type-animation';

export default function LevelCompleteModal({ isOpen, onClose }) {

    return (
        <div className={`modal-wrap ${isOpen ? 'modal-wrap--open' : ''}`}>
            <div className="modal-wrap__content">
                <div className="modal-wrap-text">
                    <div className="modal-wrap__exit">
                    </div>
                    <TypeAnimation
                        sequence={["You successfully completed the level earning $"]}
                        speed={30}
                        className="modal-wrap__text--body" />
                </div>

                <div className="modal-wrap__btns">
                    <button onClick={onClose} className="modal-wrap__btns--cancel">Continue</button>
                </div>
            </div>
        </div>
    );
}