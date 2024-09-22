import { TypeAnimation } from 'react-type-animation';
import "./LossPage.scss"
import { useNavigate } from 'react-router-dom';

export default function LossPage() {
    const navigate = useNavigate();
    const handleCLick = ((e)=>{
        e.preventDefault();
        navigate('/', { replace: true });
    })
    return (
        <div className='loss=page' onClick={handleCLick}>
            <TypeAnimation
                sequence={["You are out of usable Pokemon and scurry back to the Pokemon Center, protecting your exhausted Pokemon from any further harm..."]}
                className='typing-text'
                speed={30}
            />
        </div>
    )
}