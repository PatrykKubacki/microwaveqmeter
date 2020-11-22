import React from 'react';
import './Button.css';

type Props = {
    text: string;
    onClick: () => void;
}

const Button: React.FC<Props> = ({text, onClick}) => {
return <button className="btn" onClick={onClick}>{text}</button>
}

export default Button;