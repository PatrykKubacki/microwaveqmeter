import React from 'react';
import { Button, TextField, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux'
import { ResultBackend } from '../../../../types/Result';
import { EmptyResonator } from '../../../../types/EmptyResonator';
import { selectActiveCurrentResult } from '../../../../store/resultReducer';
import { useDispatch } from 'react-redux';
import {
    setQFactor,
    setEmptyResonator,
    setCenterFrequency,
    setPeakTransmittance,
    selectEmptyResonator,
} from '../../../../store/resonatorReducer';

const EmptyResonatorSection: React.FC = () => {
    const currentResult: ResultBackend = useSelector(selectActiveCurrentResult);
    const emptyResonator: EmptyResonator = useSelector(selectEmptyResonator);
    const dispatch = useDispatch();

    const handleGetEmptyResonator = () => {
        const resonator = {
            qFactor: !isNaN(currentResult.Q_factor) ? currentResult.Q_factor: 0,
            centerFrequency: currentResult.CenterFrequency,
            peakTransmittance: currentResult.PeakTransmittance
        };
        dispatch(setEmptyResonator(resonator));
    }   

    return (
        <>
            <Typography variant="h6">{'Empty Resonator'}</Typography><br/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField label="Q Factor" 
                               variant="outlined" 
                               size='small'
                               type={'number'}
                               onChange={(e)=> dispatch(setQFactor(e.target.value))}
                               value={emptyResonator.qFactor}/>
                </Grid>  
                <Grid item xs={12}>
                    <TextField label="Center frequency [MHz]" 
                               variant="outlined" 
                               size='small'
                               type={'number'}
                               onChange={(e)=> dispatch(setCenterFrequency(e.target.value))}
                               value={emptyResonator.centerFrequency}/>
                </Grid>  
                <Grid item xs={12}>
                    <TextField label="Peak transmittance [dB]" 
                               variant="outlined" 
                               size='small'
                               type={'number'}
                               onChange={(e)=> dispatch(setPeakTransmittance(e.target.value))}
                               value={emptyResonator.peakTransmittance}/>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" 
                            color="primary" 
                            size='large'
                            onClick={handleGetEmptyResonator}
                            >
                        {'Measure the empty resonator'}
                    </Button>
                </Grid> 
            </Grid>
            </>
    )
}

export default EmptyResonatorSection;