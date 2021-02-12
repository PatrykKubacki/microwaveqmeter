import React, { useState } from 'react';
import Section from '../Section/Section';
import { Result, ResultBackend } from '../../../../types/Result';
import { useSelector } from 'react-redux'
import styles from './ResultSection.module.css';
import ResultContent  from './ResultContent';
import ManyResultsContent from './ManyResultsContent';
import {
    Button,
    TextField,
    Grid,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { saveResult, selectCurrentResult } from '../../../../store/resultReducer';
import { selectPointsOnScreen } from '../../../../store/chartDataReducer';

type OwnProps = {
    results: Result[];
}
type Props =  OwnProps;

const ResultSection: React.FC<Props> = ({results}) => {
    const [manyResonanceMode, setManyResonanceMode] = useState(false);
    const [resultName, setResultName] = useState('');
    const [h, setH] = useState('');

    const resultFromRedux: ResultBackend = useSelector(selectCurrentResult);
    const pointsOnScreen: number = useSelector(selectPointsOnScreen);
    const dispatch = useDispatch();
    const handleSaveResultButton = () => {
        let result = {    
            sampleName: resultName !== '' ? resultName : 'Default Sample Name',
            frequencyDifference: resultFromRedux.CenterFrequencyDifference,
            h: h !== '' ? h :'0.0',
            permittivity: '2.254171',
            dielLossTangent: '9.6580E-40',
            resistivity: '',
            sheetResistance: '',
            f0: '5123.960',
            q: resultFromRedux.Q_factor,
            bw: resultFromRedux.Bandwidth,
            peak: resultFromRedux.PeakTransmittance,
            points: pointsOnScreen,
        }
                                 
        dispatch(saveResult(result));
    }

    const changeMode = () => {
        setManyResonanceMode(!manyResonanceMode);
    }

    return (
        <Section title={'Result'}>
            {!manyResonanceMode ? (
            <><ResultContent result={results[0]} resultFromRedux={resultFromRedux} pointsOnScreen={pointsOnScreen}/> <br/>
            </>):(<ManyResultsContent results={results}/>)}
            <br/>
            <Grid container>
                <Grid item xs={9}>
                    <div className={styles.merginBottom} >
                        <TextField label="h [mm]" 
                               variant="outlined"
                               size='small'
                               type={'number'}
                               value={h}
                               onChange={(e) => setH(e.target.value)}/>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <TextField label="Name" 
                               variant="outlined" 
                               size='small'
                               value={resultName}
                               onChange={(e) => setResultName(e.target.value)}/>
                </Grid>
                <Grid item xs={3} >
                    <Button variant="contained" 
                            color="primary" 
                            size='large'
                            onClick={() => handleSaveResultButton()}>
                        {'Save'}
                    </Button>
                </Grid> 
            </Grid> <br/>
                    <Button variant="contained" 
                            color="default" 
                            size='small'
                            onClick={changeMode}>
                        {'temporary button change mode'}
                    </Button>
        </Section>
    )
}

export default ResultSection;