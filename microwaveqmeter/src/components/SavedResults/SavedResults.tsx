import React, { useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCurrentResults,
    setLastSessionsNames,
    selectLastSessionsNames,
    setCurrentResultFromSavedSession,
    selectCurrentSession,
    setCurrentSession,
} from '../../store/resultReducer';
import styles from './SavedResult.module.css';
import { createRequestObject, apiCall } from '../../apiCall/apiCall';
import { ErrorSnackBar } from '../Controls/Alerts/ErrorSnackBar';

type Props = {
    items: SavedResult[];
}

const SavedResults: React.FC<Props> = ({items}) => {
    const [expanded, setExpanded] = useState('');
    const [sessionName, setSessionName] = useState('');
    const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);
    const savedResults: SavedResult[] = useSelector(selectCurrentResults);
    const lastSessionsNames: string[] = useSelector(selectLastSessionsNames);
    const currentSession: string = useSelector(selectCurrentSession)
    const dispatch = useDispatch();

    const handleChange = (panel: any) => (event:any, newExpanded:any) => {
      setExpanded(newExpanded ? panel : false);
    };

    const handleSetLastSession = (sessions: object) => {
        dispatch(setLastSessionsNames(sessions))
    }

    const handleSaveButton = () => {
        if(savedResults.length <= 0) {
            setIsErrorSnackOpen(true);
            return;
        }

        let name = '';
        if(currentSession !== 'New' && sessionName === "") {
            name = currentSession;
        } else {
            name = sessionName !== "" 
            ? sessionName 
            : currentSession !== 'New'
                ? currentSession
                : `session-${Date.now().toPrecision().toString()}`;   
        }

        const request = createRequestObject('POST',
            'https://localhost:44353/api/Home/SaveMeasurements ',
            JSON.stringify({ 'SessionName': name, 'Measurements': savedResults }),
            handleSetLastSession);
        apiCall(request);
    }

    const handleSetActiveMeasurements = (measurements: object) => {
        if(measurements !== undefined) {
            dispatch(setCurrentResultFromSavedSession(measurements));
        }
    }
    const handleSessionChange = (e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        const session = e.target.value;
        dispatch(setCurrentSession(session))
        if(session !== 'New') {
            const request = createRequestObject('POST',
                'https://localhost:44353/api/Home/GetSavedMeasurementsSession ',
            JSON.stringify({ 'SessionName': session }),
            handleSetActiveMeasurements);
            apiCall(request);    
        } else {
            handleSetActiveMeasurements([]);
        }
    }

    return (
        <div>
            <ErrorSnackBar isOpen={isErrorSnackOpen} onClose={()=>setIsErrorSnackOpen(false)} message={'No measurements to save'}/> 
            <Grid container spacing={2}>
                <Grid item xs={3} xl={2}>
                    <TextField label="Session name" 
                               variant="outlined" 
                               size='small'
                               value={sessionName}
                               onChange={(e) => setSessionName(e.target.value)}
                               />
                </Grid>
                <Grid item xs={2} xl={2}>
                    <Button variant="contained" 
                            color="primary" 
                            size='medium'
                            onClick={handleSaveButton}>
                         {'Save'}
                    </Button>
                </Grid>
                <Grid item xs={3} xl={2}>
                    <InputLabel id="SavedResultsSelectLabel">Last sessions</InputLabel>
                    <Select labelId="SavedResultsSelectLabel" id="SavedResultsSelect" onChange={handleSessionChange} value={currentSession}>
                        <MenuItem value={'New'}>{'New'}</MenuItem>
                        {lastSessionsNames.map(fileName => <MenuItem value={fileName}>{fileName}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={4} xl={2}>
                    <CSVLink data={savedResults}
                             separator=";" 
                             className={styles.exportToCsvLink}
                             filename={`Exported_Measurements_${Date.now().toPrecision().toString()}.csv`}>
                         <Button variant="contained" 
                                 color="primary" 
                                 size='medium'>
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