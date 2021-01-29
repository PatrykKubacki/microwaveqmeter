import React from 'react';
import Section from '../Section/Section';
import { useSelector } from 'react-redux';
import { selectStartFrequency, selectStopFrequency, selectPointsOnScreen } from '../../../../store/chartDataReducer';
import { Button, TextField, Grid } from '@material-ui/core';

const ActionsSection: React.FC = () => {
    const startFrequency: number = useSelector(selectStartFrequency);
    const stopFrequency: number = useSelector(selectStopFrequency);
    const pointsOnScreen: number = useSelector(selectPointsOnScreen);

    return (
        <Section title={'Graph settings and actions'}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Button variant="contained" 
                            color="primary" 
                            size='large'>
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
                            size='large'>
                        {'Un-zoom full'}
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <TextField label="Start [Mhz]" 
                               variant="outlined" 
                               size='small'
                               value={startFrequency}/>
                </Grid>
                <Grid item xs={2}>
                    <TextField label="Stop [Mhz]" 
                               variant="outlined" 
                               size='small'
                               value={stopFrequency}/>
                </Grid>
                <Grid item xs={2}>
                    <TextField label="Points on screen" 
                               variant="outlined" 
                               size='small'
                               value={pointsOnScreen}/>
                </Grid>

            </Grid>
        </Section>
    )
}

export default ActionsSection;