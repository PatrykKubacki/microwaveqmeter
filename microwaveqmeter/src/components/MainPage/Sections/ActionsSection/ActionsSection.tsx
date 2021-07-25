import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectHubConnectionId,
    selectMaximums,
    setViewportMinimum,
} from '../../../../store/chartDataReducer';
import {
    selectStartFrequency,
    selectStopFrequency,
    selectPointsOnScreen,
} from '../../../../store/graphActionsReducer';
import { selectCurrentResult } from '../../../../store/resultReducer';
import { Button, TextField, Grid, ButtonGroup, Card, CardContent, Typography } from '@material-ui/core';
import { MaximumOnChart } from '../../../../types/Chart';
import { ResultBackend } from '../../../../types/Result';
import { createRequestObject, apiCall } from '../../../../apiCall/apiCall';

const ActionsSection: React.FC = () => {
    const [startFrequencyState, setStartFrequencyState] = useState('');
    const [stopFrequencyState, setStopFrequencyState] = useState('');
    const [pointsOnScreenState, setPointsOnScreenState] = useState('');
    const startFrequency: number = useSelector(selectStartFrequency);
    const stopFrequency: number = useSelector(selectStopFrequency);
    const pointsOnScreen: number = useSelector(selectPointsOnScreen);
    const connectionId: string = useSelector(selectHubConnectionId);
    const maximums: MaximumOnChart[] = useSelector(selectMaximums);
    const currentResult: ResultBackend = useSelector(selectCurrentResult);
    const dispatch = useDispatch();

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
            const request = createRequestObject(
                'POST',
                'https://localhost:44353/api/Home/SetStartFrequency',
                JSON.stringify({ 'value': value }));
            apiCall(request);
        }

        const timeOutId = setTimeout(() => handleSetStartRange(startFrequencyState), 500);
        return () => clearTimeout(timeOutId);
      }, [startFrequencyState, connectionId]);
    
     useEffect(() => {
        const handleSetStopRange = (value: string) => {
            const request = createRequestObject(
                'POST',
                'https://localhost:44353/api/Home/SetStopFrequency',
                JSON.stringify({'value': value }));
            apiCall(request);
         }

        const timeOutId = setTimeout(() => handleSetStopRange(stopFrequencyState), 500);
        return () => clearTimeout(timeOutId);
      }, [stopFrequencyState, connectionId]);

     useEffect(() => {
        const handleSetPointsOnScreen = (value: string) => {
            const request = createRequestObject(
                'POST',
                'https://localhost:44353/api/Home/SetPointsOnScreen',
                JSON.stringify({ 'value': value }));
            apiCall(request);
         }

        const timeOutId = setTimeout(() => handleSetPointsOnScreen(pointsOnScreenState), 500);
        return () => clearTimeout(timeOutId);
      }, [pointsOnScreenState, connectionId]);
     
    const handleUnZoomFull = () => {
        const request = createRequestObject(
            'POST',
            'https://localhost:44353/api/Home/UnZoomFull');
        apiCall(request);
    }

    const handleAutoCenter = () => {
        const bandwidthX3 = currentResult.Bandwidth * 3;
        const start = maximums[0].frequency - bandwidthX3;
        const stop = maximums[maximums.length - 1].frequency + bandwidthX3;

        const request = createRequestObject(
            'POST',
            'https://localhost:44353/api/Home/SetStartStopRangeFrequency',
            JSON.stringify({
                'start': start.toString().replace('.',','),
                'stop': stop.toString().replace('.',',')
                }));
        apiCall(request);
    }

    const handleAutoScale = () => {
        dispatch(setViewportMinimum())
    }

    return (
        <Card>
            <CardContent>
            <Typography variant="h6">{'Graph actions & swap settings'}</Typography><br/>
            <Grid container spacing={1} justify="center" alignItems="center" direction="column">
                <Grid item >
                <ButtonGroup  color="primary" size="small">
                    <Button onClick={handleAutoCenter}>
                        {'Autocenter'}
                    </Button>
                    <Button onClick={handleAutoScale}>
                        {'Autoscale'}
                    </Button>
                    <Button onClick={handleUnZoomFull}>
                        {'Un-zoom full'}
                    </Button>
                </ButtonGroup>
                </Grid><br/>
                <Grid item >
                    <TextField label="Start [Mhz]" 
                               variant="outlined" 
                               size='small'
                               onChange={(e) =>setStartFrequencyState(e.target.value)}
                               value={startFrequencyState}/>
                </Grid><br/>
                <Grid item >
                    <TextField label="Stop [Mhz]" 
                               variant="outlined" 
                               size='small'
                               onChange={(e) => setStopFrequencyState(e.target.value)}
                               value={stopFrequencyState}/>
                </Grid><br/>
                <Grid item>
                    <TextField label="Points on screen" 
                               variant="outlined" 
                               size='small'
                               onChange={(e) => setPointsOnScreenState(e.target.value)}
                               value={pointsOnScreenState}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ActionsSection;