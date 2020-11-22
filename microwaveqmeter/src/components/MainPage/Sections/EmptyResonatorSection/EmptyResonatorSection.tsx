import React from 'react';
import Section from '../Section/Section';
import { Button, Input } from '../../../Controls';

const EmptyResonatorSection: React.FC = () => {
    return (
        <Section title={'Empty Resonator'}>
            <Input label={'Q Factor:'}/><br/>
            <Input label={'Center frequency [MHz]:'}/><br/>
            <Input label={'Peak transmittance [dB]:'}/><br/><br/>
            <Button text={'Measure the empty resonator'} onClick={()=>null}/>
    </Section>
    )
}

export default EmptyResonatorSection;