import React from 'react';
import styles from './BrandLogo.module.css';

type Props = {
    text:string;
}
const BrandLogo: React.FC<Props> = ({text}) => {
    return <b className={styles.self}>{text}</b>
}

export default BrandLogo;