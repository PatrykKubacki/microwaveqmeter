import React from 'react';
import Section from '../Section/Section';
import { Button, TextField, Grid } from '@material-ui/core';

const EmptyResonatorSection: React.FC = () => {
    return (
        <Section title={'Empty Resonator'}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField label="Q Factor" 
                               variant="outlined" 
                               size='small'/>
                </Grid>  
                <Grid item xs={12}>
                    <TextField label="Center frequency [MHz]" 
                               variant="outlined" 
                               size='small'/>
                </Grid>  
                <Grid item xs={12}>
                    <TextField label="Peak transmittance [dB]" 
                               variant="outlined" 
                               size='small'/>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" 
                            color="primary" 
                            size='large'>
                        {'Measure the empty resonator'}
                    </Button>
                </Grid> 
            </Grid>

    </Section>
    )
}

export default EmptyResonatorSection;