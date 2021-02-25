import React from 'react';
import { Result, ResultBackend } from '../../../../types/Result';
import { LabelDataWithGrid } from '../../../Controls';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectEmptyResonatorCenterFrequency } from '../../../../store/resonatorReducer';

type Props = {
    result: Result;
    resultFromRedux: ResultBackend;
    pointsOnScreen: number;
}

const ResultContent: React.FC<Props> = ({result, resultFromRedux, pointsOnScreen}) => {
    const emptyResonatorCenterFrequency = useSelector(selectEmptyResonatorCenterFrequency); 

    const getCenterFrequencyDifference = () => {
        const emptResonatorCenterFrequency = isNaN(emptyResonatorCenterFrequency) ? 0 : emptyResonatorCenterFrequency; 
        let result = resultFromRedux.CenterFrequency - emptResonatorCenterFrequency;
        result = Math.round((result) * 1000) / 1000;
        return isNaN(result) ? 0 : result.toString();
    }

     const formatEmptyValue = (value: number) => {
         return value === null || value === undefined || value === 0 || isNaN(value)
            ? '---' 
            : value.toString();
     }

     

    return (
        <Grid container>
            <LabelDataWithGrid bold doubleSize label={'Q Factor'} value={formatEmptyValue(resultFromRedux.Q_factor)} />
            <LabelDataWithGrid bold label={'Center frequency diff'} value={`${getCenterFrequencyDifference()} Mhz`} />
            <LabelDataWithGrid label={'Center frequency'} value={`${formatEmptyValue(resultFromRedux.CenterFrequency)} Mhz`} />
            <LabelDataWithGrid label={'3-dB bandwidth'} value={`${formatEmptyValue(resultFromRedux.Bandwidth)} Mhz`} />
            <LabelDataWithGrid label={'Peak transmittance'} value={`${formatEmptyValue(resultFromRedux.PeakTransmittance)} dB`} />
            <LabelDataWithGrid label={'Number of Points'} value={formatEmptyValue(pointsOnScreen)} /> 
        </Grid>
    )
}

export default ResultContent;