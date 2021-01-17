import React, { useState } from 'react';
import Section from '../Section/Section';
import { Result } from '../../../../types/Result';
import ResultContent  from './ResultContent';
import { Button, TextField, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { saveResult } from '../../../../store/slice';

type OwnProps = {
    results: Result[];
}
type Props =  OwnProps;

const ResultSection: React.FC<Props> = ({results}) => {
    const [resultName, setResultName] = useState('');
    const dispatch = useDispatch();
    const handleSaveResultButton = () => {
        let result = {    
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
        result.sampleName = resultName !== '' 
                                ? resultName
                                : 'Default Sample Name';
                                 
        dispatch(saveResult(result));
    }

    return (
        <Section title={'Result'}>
            <ResultContent result={results[0]} /> <br/>
            <Grid container>
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
            </Grid>
        </Section>
    )
}

export default ResultSection;