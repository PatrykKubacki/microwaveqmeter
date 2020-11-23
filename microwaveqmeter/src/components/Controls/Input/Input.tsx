import React from 'react';
import styles from './Input.module.css'

type Props = {
    label: string;
}

const Input: React.FC<Props> = ({label}) => {
return (
    <div className={styles.inputGroup}> 
        <label className={styles.inputLabel}>{label}</label>
        <input className={styles.input} type="number" aria-label={label}/>
    </div>
    )
}

export default Input;