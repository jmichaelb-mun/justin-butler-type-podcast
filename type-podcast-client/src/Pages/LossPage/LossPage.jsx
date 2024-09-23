import { TypeAnimation } from 'react-type-animation';
import "./LossPage.scss"
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

export default function LossPage() {
    const navigate = useNavigate();
    const handleCLick = ((e) => {
        e.preventDefault();
        navigate('/', { replace: true });
    })
    return (
        <div>
            <Header />
            <div className='loss-page'>
                <div className='loss-page__border-box' onClick={handleCLick}>
                    <TypeAnimation
                        sequence={["You are out of usable Pokemon and scurry back to the Pokemon Center, protecting your exhausted Pokemon from any further harm..."]}
                        className='typing-text'
                        speed={50}
                    />
                </div>
            </div>
        </div>
    )
}