import React from 'react';
import { SavedResult } from '../../types/SavedResult';
import SavedResultsHeader  from './SavedResultsHeader';
import SavedResultsContent from './SavedResultsContent';
import {
     Accordion,
     AccordionSummary, 
     AccordionDetails, 
     Select,
     InputLabel,
     MenuItem,
     Button,
     Grid 
} from '@material-ui/core';

type Props = {
    items: SavedResult[];
    savedResulsFilesNames: string[];
}

const SavedResults: React.FC<Props> = ({items, savedResulsFilesNames}) => {
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel: any) => (event:any, newExpanded:any) => {
      setExpanded(newExpanded ? panel : false);
    };

    return (
        <div> 
            <Grid container>
                <Grid item xs={2}>
                    <InputLabel id="SavedResultsSelectLabel">Saved results</InputLabel>
                    <Select labelId="SavedResultsSelectLabel" id="SavedResultsSelect">
                        <MenuItem value={'New'}>{'New'}</MenuItem>
                        {savedResulsFilesNames.map(fileName => <MenuItem value={fileName}>{fileName}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" 
                            color="primary" 
                            size='large'>
                        {'Export to CSV'}
                    </Button>
                </Grid>
            </Grid> 
                <br/>
           {items.map((item, index) => {
               return (
                <Accordion square 
                           key={`panel-${index}`}
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