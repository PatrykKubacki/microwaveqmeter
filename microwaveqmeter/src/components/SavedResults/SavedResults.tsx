import React, { useState } from 'react';
import { SavedResult } from '../../types/SavedResult';
import SavedResultsHeader from './SavedResultsHeader';
import SavedResultsContent from './SavedResultsContent';

type Props = {
    items: SavedResult[];
}

const SavedResults: React.FC<Props> = ({items}) => {
    const [openedResult, setOpenedResult] = useState(-1);

    const handleOpenResultContent = (index: number) => {
        if(index === openedResult) {
            setOpenedResult(-1);
        } else {
            setOpenedResult(index);
        }
    }

    const cardIsOpen = (index: number) => index === openedResult
    

    return (
        <div>
           {items.map((item, index) => {
               return ( 
                <React.Fragment key={index}>
                    <SavedResultsHeader 
                        item={item} 
                        isOpen={cardIsOpen(index)}
                        onClick={() => handleOpenResultContent(index)}
                    />
                    <SavedResultsContent item={item} isOpen={cardIsOpen(index)}/>
                </React.Fragment>
               )
           })}
        </div>
    ) 
}

export default SavedResults;