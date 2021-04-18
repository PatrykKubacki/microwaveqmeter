import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { createRequestObject, apiCall } from '../../../../apiCall/apiCall';
import { useSelector } from 'react-redux';
import { 
    selectStartFrequency,
    selectStopFrequency,
    selectPointsOnScreen,
    selectHubConnectionId,
} from '../../../../store/chartDataReducer';
import styles from './GraphSwipeInputs.module.css';

const GraphSwipeInputs: React.FC = () => {
    const [startFrequencyState, setStartFrequencyState] = useState('');
    const [stopFrequencyState, setStopFrequencyState] = useState('');
    const [pointsOnScreenState, setPointsOnScreenState] = useState('');
    const startFrequency: number = useSelector(selectStartFrequency);
    const stopFrequency: number = useSelector(selectStopFrequency);
    const pointsOnScreen: number = useSelector(selectPointsOnScreen);
    const connectionId: string = useSelector(selectHubConnectionId);

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
                JSON.stringify({ 'connectionId': connectionId, 'value': value }));
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
                JSON.stringify({ 'connectionId': connectionId, 'value': value }));
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
                JSON.stringify({ 'connectionId': connectionId, 'value': value }));
            apiCall(request);
         }

        const timeOutId = setTimeout(() => handleSetPointsOnScreen(pointsOnScreenState), 500);
        return () => clearTimeout(timeOutId);
      }, [pointsOnScreenState, connectionId]);

    return ( 
        <div className={styles.self}>
            <TextField label="Start [Mhz]" 
                       variant="outlined" 
                       size='small'
                       onChange={(e) =>setStartFrequencyState(e.target.value)}
                       value={startFrequencyState}
                       className={styles.textFields}/>
            <TextField label="Stop [Mhz]" 
                       variant="outlined" 
                       size='small'
                       onChange={(e) => setStopFrequencyState(e.target.value)}
                       value={stopFrequencyState}
                       className={styles.textFields}/>
            <TextField label="Points on screen" 
                       variant="outlined" 
                       size='small'
                       onChange={(e) => setPointsOnScreenState(e.target.value)}
                       value={pointsOnScreenState}
                       className={styles.textFields}/>
    </div>
    );
}

export default GraphSwipeInputs;