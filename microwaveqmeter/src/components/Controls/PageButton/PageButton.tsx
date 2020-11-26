import React from 'react';
import styles from './PageButton.module.css';
import classnames from 'classnames';

type Props = {
    active: boolean;
    text: string;
    onClick: () => void;
}

const PageButton: React.FC<Props> = ({text, active, onClick}) => {
    return (
    <button className={classnames(styles.self, {
        [styles.active]: active,
        })} onClick={onClick}>
            {text}
    </button>
    )
}

export default PageButton;