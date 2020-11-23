import React from 'react';
import classnames from 'classnames';
import styles from './LabelData.module.css';

type Props = {
    label: string;
    value: string;
    bold?: boolean;
}

const LabelData: React.FC<Props> = ({label, value, bold}) => {
    return (
        <label className={classnames(styles.self, {
            [styles.bold]: bold,
        })}>
            {`${label}: ${value}`}
        </label>
    )
} 

export default LabelData;