import React from 'react';
import { 
    ActionsSection, 
    ResultSection, 
    EmptyResonatorSection,
    SavedResultsSections, 
    GraphSection,
} from './Sections';
import { Result } from '../../types/Result';
import { SavedResult } from '../../types/SavedResult';
import styles from './MainPage.module.css';
import { Grid } from '@material-ui/core';

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
            <Grid container>
                <Grid item xs={12}>
                    <ActionsSection />
                </Grid>
                 <Grid item xs={12}>
                     <div className={styles.divek}>
                         <div className={styles.quarterElement}>
                             <ResultSection results={results} />
                         </div>
                        <div className={styles.grapf}>
                            <GraphSection/>
                        </div> <br/>
                        <div className={styles.quarterElement}>
                            <EmptyResonatorSection/>
                        </div>
                     </div>
                </Grid>
                <Grid item xs={12}>
                    <SavedResultsSections savedResults={savedResults}/>
                </Grid>
            </Grid>
            
        </>
    )
}

export default MainPage;