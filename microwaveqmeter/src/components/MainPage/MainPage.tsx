import React from 'react';
import { 
    ActionsSection, 
    ResultSection, 
    EmptyResonatorSection,
    SavedResultsSections, 
} from './Sections';
import { Result } from '../../types/Result';
import { SavedResult } from '../../types/SavedResult';
import styles from './MainPage.module.css';

const savedResults: SavedResult[] = [
    {    
        sampleName:'Duroid 5880',
        frequencyDifference: '1183.3',
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
    {    
        sampleName:'Duroid 5880',
        frequencyDifference: '1183.3',
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

const results: Result[] = [
    {
        q: '9789',
        frequencyDifference: '1183.3',
        f0: '5123.960',
        bw: '0.5344',
        peak: '-33.9',
        points: '529',
    },
    {    
        q: '2789',
        frequencyDifference: '183.3',
        f0: '5623.960',
        bw: '0.4644',
        peak: '-20.9',
        points: '892',
    }
]

const MainPage: React.FC = () => {
    return (
        <>
            <br/>
            <ActionsSection />
            <div className={styles.quarterSection}><ResultSection results={results}/></div>
            <div className={styles.quarterSection}><EmptyResonatorSection /></div>
            <SavedResultsSections savedResults={savedResults}/>
        </>
    )
}

export default MainPage;