import React from 'react';
import Section from '../Section/Section';
import { Button, LabelData } from '../../../Controls';

const ResultSection: React.FC = () => {
    return (
        <Section title={'Result'}>
            <LabelData boldMode label={'Q Factor'} value={'11843.3'} />
            <LabelData boldMode label={'Center frequency difference'} value={'1183.3'} />
            <LabelData label={'Center frequency [MHz]'} value={'5138.2042'} />
            <LabelData label={'3-dB bandwidth [MHz]'} value={'0.437'} />
            <LabelData label={'Peak transmittance [dB]'} value={'-41.6'} />
            <LabelData label={'Number of Points'} value={'436'} /> <br/>
            <Button text={'Save'} onClick={()=>null}/>
        </Section>
    )
}

export default ResultSection;