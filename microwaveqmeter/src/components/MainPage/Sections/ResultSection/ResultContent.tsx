import React from 'react';
import { Result } from '../../../../types/Result';
import { LabelData } from '../../../Controls';
import { Grid } from '@material-ui/core';

type Props = {
    result: Result;
}

const ResultContent: React.FC<Props> = ({result}) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <LabelData bold doubleSize label={'Q Factor'} value={result.q} />
            </Grid>
            <Grid item xs={12}>
                <LabelData bold label={'Center frequency difference'} value={result.frequencyDifference} />
            </Grid>
            <Grid item xs={12}>
                <LabelData label={'Center frequency [MHz]'} value={result.f0} />
            </Grid>
            <Grid item xs={12}>
                <LabelData label={'3-dB bandwidth [MHz]'} value={result.bw} />
            </Grid>
            <Grid item xs={12}>
                <LabelData label={'Peak transmittance [dB]'} value={result.peak} />
            </Grid>
            <Grid item xs={12}>
                <LabelData label={'Number of Points'} value={result.points} /> 
            </Grid>
        </Grid>
    )
}

export default ResultContent;