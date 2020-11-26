import React from 'react';
import { Result } from '../../../../types/Result';
import { LabelData } from '../../../Controls';

type Props = {
    result: Result;
}

const ResultContent: React.FC<Props> = ({result}) => {
    return (
        <>
            <LabelData bold label={'Q Factor'} value={result.q} />
            <LabelData bold label={'Center frequency difference'} value={result.frequencyDifference} />
            <LabelData label={'Center frequency [MHz]'} value={result.f0} />
            <LabelData label={'3-dB bandwidth [MHz]'} value={result.bw} />
            <LabelData label={'Peak transmittance [dB]'} value={result.peak} />
            <LabelData label={'Number of Points'} value={result.points} /> 
        </>
    )
}

export default ResultContent;