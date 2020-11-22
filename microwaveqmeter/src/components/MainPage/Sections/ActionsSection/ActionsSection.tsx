import React from 'react';
import Section from '../Section/Section';
import { Button, Input } from '../../../Controls';

const ActionsSection: React.FC = () => {
    return (
        <Section title={'Graph settings and actions'}>
                <Button text={'Autocenter'} onClick={()=>null}/>
                <Button text={'Autoscale'} onClick={()=>null}/>
                <Button text={'Un-zoom full'} onClick={()=>null}/>
                <Input label={'Start [Mhz]:'}/>
                <Input label={'Stop [Mhz]:'}/>
                <Input label={'Points on screen:'}/>
        </Section>
    )
}

export default ActionsSection;