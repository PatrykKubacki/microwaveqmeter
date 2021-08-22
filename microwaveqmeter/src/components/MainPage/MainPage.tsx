import React from 'react';
import { 
    ResultSection, 
    SavedResultsSections, 
    GraphSection,
} from './Sections';
import { SavedResult } from '../../types/SavedResult';
import styles from './MainPage.module.css';
import { Grid } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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

const MainPage: React.FC = () => {
    const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');

    return (
        <>
            <br/>
            <Grid container spacing={3}>
                 <Grid item xs={12}>
                     <div className={styles.wrapper}>
                        <div className={styles.graphSection}>
                            <GraphSection/>
                        </div>
                    </div>
                </Grid><br/><br/><br/>
                    <Grid item xs={isTabletOrMobile ? 12: 4} xl={2}>
                        <ResultSection/>
                    </Grid>
                    <Grid item xs={isTabletOrMobile ? 12: 7} xl={9}>
                        <SavedResultsSections savedResults={savedResults}/>
                    </Grid>
            </Grid>
        </>
    )
}

export default MainPage;