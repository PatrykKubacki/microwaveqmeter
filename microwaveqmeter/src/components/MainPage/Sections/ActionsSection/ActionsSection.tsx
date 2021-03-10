import React from 'react';
import Section from '../Section/Section';
import { useSelector } from 'react-redux';
import { 
    selectStartFrequency,
    selectStopFrequency,
    selectPointsOnScreen,
    selectHubConnectionId,
    selectMaximums,
} from '../../../../store/chartDataReducer';
import { Button, TextField, Grid } from '@material-ui/core';
import { MaximumOnChart } from '../../../../types/Chart';

const ActionsSection: React.FC = () => {
    const startFrequency: number = useSelector(selectStartFrequency);
    const stopFrequency: number = useSelector(selectStopFrequency);
    const pointsOnScreen: number = useSelector(selectPointsOnScreen);
    const connectionId: string = useSelector(selectHubConnectionId);
    const maximums: MaximumOnChart[] = useSelector(selectMaximums);

    const getRangeRequestOptions = (value: string) => ({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'connectionId': connectionId, 'value': value })
    });

    const handleSetStartRange = (value: string) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'connectionId': connectionId, 'value': value })
        };
         fetch('https://localhost:44353/api/Home/SetStartFrequency', requestOptions)
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
     }  
     
    const handleSetStopRange = (value: string) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'connectionId': connectionId, 'value': value })
        };
        fetch('https://localhost:44353/api/Home/SetStopFrequency', requestOptions)
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
     }

     const handleSetPointsOnScreen = (value: string) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'connectionId': connectionId, 'value': value })
        };
        fetch('https://localhost:44353/api/Home/SetPointsOnScreen', requestOptions)
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
     }
     
    const handleUnZoomFull = () => {
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'connectionId': connectionId }),
        };
        fetch('https://localhost:44353/api/Home/UnZoomFull', request)
        .then(response => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleAutoCenter = () => {
        const start = maximums[0].frequency - 100;
        const stop = maximums[maximums.length - 1].frequency + 100;
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                 'connectionId': connectionId,
                 'start': start.toString().replace('.',','),
                 'stop': stop.toString().replace('.',',')
                 }),
        };
        fetch('https://localhost:44353/api/Home/SetStartStopRangeFrequency', request)
        .then(response => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <Section title={'Graph settings and actions'}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Button variant="contained" 
                            color="primary" 
                            size='large'
                            onClick={handleAutoCenter}>
                        {'Autocenter'}
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" 
                            color="primary" 
                            size='large'>
                        {'Autoscale'}
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" 
                            color="primary" 
                            size='large'
                            onClick={handleUnZoomFull}>
                        {'Un-zoom full'}
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <TextField label="Start [Mhz]" 
                               variant="outlined" 
                               size='small'
                               onChange={(e) => handleSetStartRange(e.target.value)}
                               value={startFrequency}/>
                </Grid>
                <Grid item xs={2}>
                    <TextField label="Stop [Mhz]" 
                               variant="outlined" 
                               size='small'
                               onChange={(e) => handleSetStopRange(e.target.value)}
                               value={stopFrequency}/>
                </Grid>
                <Grid item xs={2}>
                    <TextField label="Points on screen" 
                               variant="outlined" 
                               size='small'
                               onChange={(e) => handleSetPointsOnScreen(e.target.value)}
                               value={pointsOnScreen}/>
                </Grid>

            </Grid>
        </Section>
    )
}

export default ActionsSection;