import React from 'react';
import { PageButton } from '../../../Controls';

type Props = {
    currentPage: number;
    pages: number; 
    onClick: (index: number) => void;
}

const ResultPagesButtons: React.FC<Props> = ({currentPage, pages, onClick}) => {
    const generateButtons = () => {
        let result = [];
        for(let i = 0; i < pages; i++) {
            let button = <PageButton 
                active={currentPage === i} 
                text={(i+1).toString()} 
                onClick={() => onClick(i)}/>;
                
            result.push(button);
        }
        return result;
    }

    return (
        <>
            {generateButtons()}
        </>
    )
}


export default ResultPagesButtons;

