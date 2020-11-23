import React from 'react';
import styles from './Section.module.css';

type Props = {
    title: string;
}

const Section: React.FC<Props> = ({title, children}) => {
    return (
        <div className={styles.sectionContainer}>
            <b className={styles.sectionTitle}>
                {title}
            </b>
            <div>{children}</div>
        </div>
    )
}

export default Section;