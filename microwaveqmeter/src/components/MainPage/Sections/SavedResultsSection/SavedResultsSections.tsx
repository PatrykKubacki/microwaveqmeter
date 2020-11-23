import React from 'react';
import Section from '../Section/Section';
import { SavedResult } from '../../../../types/SavedResult';
import SavedResults from '../../../SavedResults/SavedResults';

const items: SavedResult[] = [
    {    
        sampleName:'Duroid 5880',
        h: '0.508',
        permittivity: '2.254171',
        dielLossTangent: '9.6580E-40',
        resistivity: '',
        sheetResistance: '',
        f0: '5123.960',
        q: '9789',
        bw: '0.5344',
        peak: '-33.9',
        points: '529',
    },
    {    sampleName:'Duroid 5880',
        h: '0.508',
        permittivity: '2.254171',
        dielLossTangent: '9.6580E-40',
        resistivity: '',
        sheetResistance: '',
        f0: '5123.960',
        q: '9789',
        bw: '0.5344',
        peak: '-33.9',
        points: '529',
    }
]

const SavedResultsSections: React.FC = () => {
    return (
        <Section title={'Saved results'}>
            <SavedResults items={items}/>
        </Section>
    )
}

export default SavedResultsSections;