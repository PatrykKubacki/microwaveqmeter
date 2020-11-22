import React from 'react';
import './Section.css';

type Props = {
    title: string;
}

const Section: React.FC<Props> = ({title, children}) => {
    return (
        <div className="sectionContainer">
            <b className="sectionTitle">
                {title}
            </b>
            <div>{children}</div>
        </div>
    )
}

export default Section;