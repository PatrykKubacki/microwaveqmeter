import React, { useState } from 'react';
import Section from '../Section/Section';
import { Button, TextField, Grid } from '@material-ui/core';

const EmptyResonatorSection: React.FC = () => {
    const [qFactor, setQFactor] = useState('');
    const [centerFrequency, setCenterFrequency] = useState('');
    const [peakTransmittance, setPeakTransmittance] = useState('');

    const setStateEmptyResonator = (qFactor: string, centerFrequency: string, peakTransmittance: string) => {
        setQFactor(qFactor);
        setCenterFrequency(centerFrequency);
        setPeakTransmittance(peakTransmittance);
    }

    const handleGetEmptyResonator = () => {
        fetch('https://localhost:44353/api/Home/GetEmptyResonator')
            .then(res => res.json())
            .then(json => setStateEmptyResonator(json.qFactor, json.centerFrequency, json.peakTransmittance))
            .catch(error => console.log(error));
    }   

    return (
        <Section title={'Empty Resonator'}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField label="Q Factor" 
                               variant="outlined" 
                               size='small'
                               value={qFactor}/>
                </Grid>  
                <Grid item xs={12}>
                    <TextField label="Center frequency [MHz]" 
                               variant="outlined" 
                               size='small'
                               value={centerFrequency}/>
                </Grid>  
                <Grid item xs={12}>
                    <TextField label="Peak transmittance [dB]" 
                               variant="outlined" 
                               size='small'
                               value={peakTransmittance}/>
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

    </Section>
    )
}

export default EmptyResonatorSection;