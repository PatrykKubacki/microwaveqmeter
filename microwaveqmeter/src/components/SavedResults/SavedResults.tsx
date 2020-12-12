import React from 'react';
import { SavedResult } from '../../types/SavedResult';
import SavedResultsHeader  from './SavedResultsHeader';
import SavedResultsContent from './SavedResultsContent';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

type Props = {
    items: SavedResult[];
}

const SavedResults: React.FC<Props> = ({items}) => {
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel: any) => (event:any, newExpanded:any) => {
      setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
           {items.map((item, index) => {
               return (
                <Accordion square 
                           elevation={5}
                           expanded={expanded === `panel-${index}`} 
                           onChange={handleChange(`panel-${index}`)}
                           className="accordion"
                           >
                    <AccordionSummary aria-controls={`panel-${index}d-content`} 
                                      id={`panel-${index}d-header`}
                                      className="accordion">
                        <SavedResultsHeader item={item} />
                    </AccordionSummary>
                    <AccordionDetails>
                        <SavedResultsContent item={item}/>
                    </AccordionDetails>
                </Accordion>
               )
           })}
        </div>
    ) 
}

export default SavedResults;