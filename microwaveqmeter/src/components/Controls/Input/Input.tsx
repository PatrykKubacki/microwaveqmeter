import React from 'react';
import './Input.css'

type Props = {
    label: string;
}

const Input: React.FC<Props> = ({label}) => {
return (
    <div className="inputGroup"> 
        <label className="inputLabel">{label}</label>
        <input className="input" type="number" aria-label={label}/>
    </div>
    )
}

export default Input;