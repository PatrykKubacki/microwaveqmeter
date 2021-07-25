import React from 'react';
import { ResultBackend } from '../../../../types/Result';
import { LabelDataWithGrid } from '../../../Controls';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectEmptyResonatorCenterFrequency } from '../../../../store/resonatorReducer';
import { formatEmptyValue } from '../../../../formatters/formatQFactor';

type Props = {
    result: ResultBackend;
}

const initialQFactorResult: ResultBackend = {
    Q_factor: 0,
    CenterFrequency: 0,
    Bandwidth: 0,
    PeakTransmittance: 0,
    CenterFrequencyDifference: 0,
    NumberOfPoints: 0,
}

const ResultContent: React.FC<Props> = ({result}) => {
    const emptyResonatorCenterFrequency = useSelector(selectEmptyResonatorCenterFrequency); 
    const qFactorResult = result !== undefined ? result : initialQFactorResult

    const getCenterFrequencyDifference = () => {
        const emptResonatorCenterFrequency = isNaN(emptyResonatorCenterFrequency) ? 0 : emptyResonatorCenterFrequency; 
        let centerFrequencyDiff = qFactorResult.CenterFrequency - emptResonatorCenterFrequency;
        centerFrequencyDiff = Math.round((centerFrequencyDiff) * 1000) / 1000;
        return isNaN(centerFrequencyDiff) ? 0 : centerFrequencyDiff.toString();
    }
    
    return (
        <Grid container>
            <LabelDataWithGrid bold doubleSize label={'Q Factor'} value={formatEmptyValue(qFactorResult.Q_factor)} />
            <LabelDataWithGrid bold label={'Center frequency diff'} value={`${getCenterFrequencyDifference()} Mhz`} />
            <LabelDataWithGrid label={'Center frequency'} value={`${formatEmptyValue(qFactorResult.CenterFrequency)} Mhz`} />
            <LabelDataWithGrid label={'3-dB bandwidth'} value={`${formatEmptyValue(qFactorResult.Bandwidth)} Mhz`} />
            <LabelDataWithGrid label={'Peak transmittance'} value={`${formatEmptyValue(qFactorResult.PeakTransmittance)} dB`} />
            <LabelDataWithGrid label={'Number of Points'} value={formatEmptyValue(qFactorResult.NumberOfPoints)} /> 
        </Grid>
    )
}

export default ResultContent;