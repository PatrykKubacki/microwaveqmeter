import React from 'react';
import { ResultBackend } from '../../../../types/Result';
import { LabelDataWithGrid } from '../../../Controls';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectEmptyResonatorCenterFrequency } from '../../../../store/resonatorReducer';

type Props = {
    result: ResultBackend;
    pointsOnScreen: number;
}

const ResultContent: React.FC<Props> = ({result, pointsOnScreen}) => {
    const emptyResonatorCenterFrequency = useSelector(selectEmptyResonatorCenterFrequency); 

    const getCenterFrequencyDifference = () => {
        const emptResonatorCenterFrequency = isNaN(emptyResonatorCenterFrequency) ? 0 : emptyResonatorCenterFrequency; 
        let centerFrequencyDiff = result.CenterFrequency - emptResonatorCenterFrequency;
        centerFrequencyDiff = Math.round((centerFrequencyDiff) * 1000) / 1000;
        return isNaN(centerFrequencyDiff) ? 0 : centerFrequencyDiff.toString();
    }

     const formatEmptyValue = (value: number) => {
         return value === null || value === undefined || value === 0 || isNaN(value)
            ? '---' 
            : value.toString();
     }

     

    return (
        <Grid container>
            <LabelDataWithGrid bold doubleSize label={'Q Factor'} value={formatEmptyValue(result.Q_factor)} />
            <LabelDataWithGrid bold label={'Center frequency diff'} value={`${getCenterFrequencyDifference()} Mhz`} />
            <LabelDataWithGrid label={'Center frequency'} value={`${formatEmptyValue(result.CenterFrequency)} Mhz`} />
            <LabelDataWithGrid label={'3-dB bandwidth'} value={`${formatEmptyValue(result.Bandwidth)} Mhz`} />
            <LabelDataWithGrid label={'Peak transmittance'} value={`${formatEmptyValue(result.PeakTransmittance)} dB`} />
            <LabelDataWithGrid label={'Number of Points'} value={formatEmptyValue(pointsOnScreen)} /> 
        </Grid>
    )
}

export default ResultContent;