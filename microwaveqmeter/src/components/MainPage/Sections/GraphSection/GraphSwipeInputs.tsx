import React from 'react';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import { createRequestObject, apiCall } from '../../../../apiCall/apiCall';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectDisplayFitErrorCurve,
  setDisplayFitErrorCurve
} from '../../../../store/chartDataReducer';
import {
  selectStartFrequency,
  selectStopFrequency,
  selectPointsOnScreen,
  setStartFrequency,
  setStopFrequency,
  setPointsOnScreen,
} from '../../../../store/graphActionsReducer';
import styles from './GraphSwipeInputs.module.css';

const GraphSwipeInputs: React.FC = () => {
    const startFrequency: number = useSelector(selectStartFrequency);
    const stopFrequency: number = useSelector(selectStopFrequency);
    const pointsOnScreen: number = useSelector(selectPointsOnScreen);
    const displayFitErrorCurve: boolean = useSelector(selectDisplayFitErrorCurve);
    const dispatch = useDispatch();

    const handleStartFrequencyOnBlur = () => {
      const value = isNaN(startFrequency) ? '' : startFrequency.toString()
      const request = createRequestObject(
            'POST',
            'https://localhost:44353/api/Home/SetStartFrequency',
             JSON.stringify({ 'value': value }));
      apiCall(request);
    }

    const handleStopFrequencyOnBlur = () => {
      const value = isNaN(stopFrequency) ? '' : stopFrequency.toString()
      const request = createRequestObject(
            'POST',
            'https://localhost:44353/api/Home/SetStopFrequency',
            JSON.stringify({ 'value': value }));

      apiCall(request);  
    }

    const handlePointsOnScreenOnBlur = () => {
      const value = isNaN(pointsOnScreen) ? '' : pointsOnScreen.toString()
      const request = createRequestObject(
            'POST',
            'https://localhost:44353/api/Home/SetPointsOnScreen',
            JSON.stringify({ 'value': value }));

      apiCall(request);  
    }

    const handleDisplayFitErrorCurveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setDisplayFitErrorCurve(e.target.checked));
    }

    return ( 
        <div className={styles.self}>
             <FormControlLabel label="Fit error curve" 
                               control={<Checkbox checked={displayFitErrorCurve}
                                                  onChange={handleDisplayFitErrorCurveChange}
                                                  name="checkedB"
                                                  color="primary" />}
            />
            <TextField label="Start [Mhz]" 
                       variant="outlined" 
                       size='small'
                       onChange={(e) => dispatch(setStartFrequency(e.target.value))}
                       onBlur={handleStartFrequencyOnBlur}
                       value={startFrequency}
                       className={styles.textFields}
                       type={'number'}/>
            <TextField label="Stop [Mhz]" 
                       variant="outlined" 
                       size='small'
                       onChange={(e) => dispatch(setStopFrequency(e.target.value))}
                       onBlur={handleStopFrequencyOnBlur}
                       value={stopFrequency}
                       className={styles.textFields}
                       type={'number'}/>
            <TextField label="Points on screen" 
                       variant="outlined" 
                       size='small'
                       onChange={(e) => dispatch(setPointsOnScreen(e.target.value))}
                       onBlur={handlePointsOnScreenOnBlur}
                       value={pointsOnScreen}
                       className={styles.textFields}
                       type={'number'}/>
    </div>
    );
}

export default GraphSwipeInputs;