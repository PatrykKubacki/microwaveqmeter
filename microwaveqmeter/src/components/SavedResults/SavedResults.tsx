import React from 'react';
import { SavedResult } from '../../types/SavedResult';
import SavedResultsHeader  from './SavedResultsHeader';
import SavedResultsContent from './SavedResultsContent';
import { CSVLink } from "react-csv"
import {
     Accordion,
     AccordionSummary, 
     AccordionDetails, 
     Select,
     InputLabel,
     MenuItem,
     Button,
     Grid,
     TextField 
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectCurrentResults } from '../../store/resultReducer';
import styles from './SavedResult.module.css';

type Props = {
    items: SavedResult[];
    savedResulsFilesNames: string[];
}

const SavedResults: React.FC<Props> = ({items, savedResulsFilesNames}) => {
    const [expanded, setExpanded] = React.useState('');
    const savedResults = useSelector(selectCurrentResults);

    const handleChange = (panel: any) => (event:any, newExpanded:any) => {
      setExpanded(newExpanded ? panel : false);
    };

    return (
        <div> 
            <Grid container spacing={2}>
                <Grid item xs={3} xl={2}>
                    <TextField label="Session name" 
                               variant="outlined" 
                               size='small'
                               />
                </Grid>
                <Grid item xs={3} xl={2}>
                    <InputLabel id="SavedResultsSelectLabel">Archived sessions</InputLabel>
                    <Select labelId="SavedResultsSelectLabel" id="SavedResultsSelect">
                        <MenuItem value={'New'}>{'New'}</MenuItem>
                        {savedResulsFilesNames.map(fileName => <MenuItem value={fileName}>{fileName}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={4} xl={2}>
                    <CSVLink data={savedResults}
                             separator=";" 
                             className={styles.exportToCsvLink}
                             filename={`Exported_Measurements_${Date.now().toPrecision().toString()}.csv`}>
                         <Button variant="contained" 
                                 color="primary" 
                                 size='large'>
                         {'Export to CSV'}
                        </Button>
                    </CSVLink> 
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