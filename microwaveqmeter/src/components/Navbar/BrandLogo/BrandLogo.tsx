import React from 'react';
import './BrandLogo.css';

type Props = {
    text:string;
}
const BrandLogo: React.FC<Props> = ({text}) => {
    return <b className="self">{text}</b>
}

export default BrandLogo;