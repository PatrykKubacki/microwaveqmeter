import React, { useEffect, useState } from 'react';
import Section from '../Section/Section';
import { useSelector } from 'react-redux';
import { 
    selectStartFrequency,
    selectStopFrequency,
    selectPointsOnScreen,
    selectHubConnectionId,
    selectMaximums,
    setViewportMinimum,
} from '../../../../store/chartDataReducer';
import { Button, TextField, Grid } from '@material-ui/core';
import { MaximumOnChart } from '../../../../types/Chart';
import { useDispatch } from 'react-redux';

const ActionsSection: React.FC = () => {
    const [startFrequencyState, setStartFrequencyState] = useState('');
    const [stopFrequencyState, setStopFrequencyState] = useState('');
    const [pointsOnScreenState, setPointsOnScreenState] = useState('');
    const startFrequency: number = useSelector(selectStartFrequency);
    const stopFrequency: number = useSelector(selectStopFrequency);
    const pointsOnScreen: number = useSelector(selectPointsOnScreen);
    const connectionId: string = useSelector(selectHubConnectionId);
    const maximums: MaximumOnChart[] = useSelector(selectMaximums);
    const dispatch = useDispatch();

    const getRangeRequestOptions = (value: string) => ({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'connectionId': connectionId, 'value': value })
    });

    useEffect(() => {
        setStartFrequencyState(startFrequency.toString());
      }, [startFrequency]);

      useEffect(() => {
        setStopFrequencyState(stopFrequency.toString());
      }, [stopFrequency]);

      useEffect(() => {
        setPointsOnScreenState(pointsOnScreen.toString());
      }, [pointsOnScreen]);

    useEffect(() => {
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
        const timeOutId = setTimeout(() => handleSetStartRange(startFrequencyState), 500);
        return () => clearTimeout(timeOutId);
      }, [startFrequencyState, connectionId]);
    
     useEffect(() => {
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
        const timeOutId = setTimeout(() => handleSetStopRange(stopFrequencyState), 500);
        return () => clearTimeout(timeOutId);
      }, [stopFrequencyState, connectionId]);

     useEffect(() => {
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
        const timeOutId = setTimeout(() => handleSetPointsOnScreen(pointsOnScreenState), 500);
        return () => clearTimeout(timeOutId);
      }, [pointsOnScreenState, connectionId]);
     
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
        const start = maximums[0].frequency - 20;
        const stop = maximums[maximums.length - 1].frequency + 20;
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

    const handleAutoScale = () => {
        dispatch(setViewportMinimum())
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
                            size='large'
                            onClick={handleAutoScale}>
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
                               onChange={(e) =>setStartFrequencyState(e.target.value)}
                               value={startFrequencyState}/>
                </Grid>
                <Grid item xs={2}>
                    <TextField label="Stop [Mhz]" 
                               variant="outlined" 
                               size='small'
                               onChange={(e) => setStopFrequencyState(e.target.value)}
                               value={stopFrequencyState}/>
                </Grid>
                <Grid item xs={2}>
                    <TextField label="Points on screen" 
                               variant="outlined" 
                               size='small'
                               onChange={(e) => setPointsOnScreenState(e.target.value)}
                               value={pointsOnScreenState}/>
                </Grid>

            </Grid>
        </Section>
    )
}

export default ActionsSection;