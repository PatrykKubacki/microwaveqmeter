import React from 'react';
import Section from '../Section/Section';
import { Result } from '../../../../types/Result';
import ResultContent  from './ResultContent';
import { Button, TextField, Grid } from '@material-ui/core';

type Props = {
    results: Result[];
}

const ResultSection: React.FC<Props> = ({results}) => {
    return (
        <Section title={'Result'}>
            <ResultContent result={results[0]} /> <br/>
            <Grid container>
                <Grid item xs={9}>
                    <TextField label="Name" 
                               variant="outlined" 
                               size='small'/>
                </Grid>
                <Grid item xs={3} >
                    <Button variant="contained" 
                            color="primary" 
                            size='large'>
                        {'Save'}
                    </Button>
                </Grid>
            </Grid>
        </Section>
    )
}

export default ResultSection;