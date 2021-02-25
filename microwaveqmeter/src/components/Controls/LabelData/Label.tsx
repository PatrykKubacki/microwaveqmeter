import React from 'react';
import classnames from 'classnames';
import styles from './Label.module.css';

type Props = {
    value: string;
    bold?: boolean;
    doubleSize?: boolean;
}

const Label: React.FC<Props> = ({value, bold, doubleSize}) => {
    return (
        <label className={classnames(styles.self, {
            [styles.bold]: bold,
            [styles.doubleSize]: doubleSize,
            })}>
            {value} 
        </label>
    )
}

export default Label; 