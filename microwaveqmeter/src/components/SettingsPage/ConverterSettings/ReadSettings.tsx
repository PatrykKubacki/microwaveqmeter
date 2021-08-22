import React from 'react';
import { Grid } from '@material-ui/core';
import { LabelData } from '../../Controls';

const ReadSettings: React.FC = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <LabelData  doubleSize label='Resonator' value="R5138_large"/>
                <LabelData  doubleSize label='Type' value="Split-Post"/>
            </Grid>
        </Grid>
    )
}

export { ReadSettings };