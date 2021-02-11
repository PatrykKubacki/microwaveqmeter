import React from 'react';
import { Result, ResultBackend } from '../../../../types/Result';
import { LabelData } from '../../../Controls';
import { Grid } from '@material-ui/core';

type Props = {
    result: Result;
    resultFromRedux: ResultBackend;
    pointsOnScreen: number;
}

const ResultContent: React.FC<Props> = ({result, resultFromRedux, pointsOnScreen}) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <LabelData bold doubleSize label={'Q Factor'} value={resultFromRedux.Q_factor.toString()} />
            </Grid>
            <Grid item xs={12}>
                <LabelData bold label={'Center frequency difference'} value={`${resultFromRedux.CenterFrequencyDifference.toString()} Mhz`} />
            </Grid>
            <Grid item xs={12}>
                <LabelData label={'Center frequency'} value={`${resultFromRedux.CenterFrequency.toString()} Mhz`} />
            </Grid>
            <Grid item xs={12}>
                <LabelData label={'3-dB bandwidth'} value={`${resultFromRedux.Bandwidth.toString()} Mhz`} />
            </Grid>
            <Grid item xs={12}>
                <LabelData label={'Peak transmittance'} value={`${resultFromRedux.PeakTransmittance.toString()} dB`} />
            </Grid>
            <Grid item xs={12}>
                <LabelData label={'Number of Points'} value={pointsOnScreen.toString()} /> 
            </Grid>
        </Grid>
    )
}

export default ResultContent;