import React from 'react';
import styles  from './Button.module.css';
import classnames from 'classnames';

type Props = {
    text?: string;
    elipsedBorder?: boolean;
    onClick: () => void;
}

const Button: React.FC<Props> = ({children, elipsedBorder, text, onClick}) => {
return (
    <button className={classnames(styles.btn, {[styles.btnElipsed]:elipsedBorder})} 
            onClick={onClick}>
        {children ? children : text}
    </button>
    )
}

export default Button;