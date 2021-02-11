import React, { useState } from 'react';
import Section from '../Section/Section';
import { Result, ResultBackend } from '../../../../types/Result';
import { useSelector } from 'react-redux'
import ResultContent  from './ResultContent';
import {
     Button,
     TextField,
    Grid,
    TableContainer,
    Table, 
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    FormControlLabel,
    Radio,
    RadioGroup,
    Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { saveResult, selectCurrentResult } from '../../../../store/resultReducer';
import { selectPointsOnScreen } from '../../../../store/chartDataReducer';

type OwnProps = {
    results: Result[];
}
type Props =  OwnProps;

const ResultSection: React.FC<Props> = ({results}) => {
    const [manyResonanceMode, setManyResonanceMode] = useState(false);
    const resultFromRedux: ResultBackend = useSelector(selectCurrentResult);
    const pointsOnScreen: number = useSelector(selectPointsOnScreen);
    const [resultName, setResultName] = useState('');
    const dispatch = useDispatch();
    const handleSaveResultButton = () => {
        let result = {    
            sampleName:'Duroid 5880',
            frequencyDifference: resultFromRedux.CenterFrequencyDifference,
            h: '0.508',
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
        result.sampleName = resultName !== '' 
                                ? resultName
                                : 'Default Sample Name';
                                 
        dispatch(saveResult(result));
    }

    const changeMode = () => {
        setManyResonanceMode(!manyResonanceMode);
    }

    return (
        <Section title={'Result'}>
            {!manyResonanceMode ? (
            <><ResultContent result={results[0]} resultFromRedux={resultFromRedux} pointsOnScreen={pointsOnScreen}/> <br/>
            </>):(<ManyMode results={results}/>)}
            <br/>
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

type ManyModeProps = {
    results: Result[];
}

const ManyMode: React.FC<ManyModeProps> = ({ results }) => {
    const [activeRadio, setActiveRadio] = React.useState('radio_0');
    // const handleChangeActiveRadio = (event:  React.ChangeEvent<HTMLInputElement>) => {
    //     setActiveRadio(event.target.value);
    // };
    const changeHandle = (value:  string) => {
        setActiveRadio(value);
        };
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Active</TableCell>
                        <TableCell>Q Factor</TableCell>
                        <TableCell>Center frequency difference</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {/* <RadioGroup name="gender1" value={activeRadio} onChange={handleChangeActiveRadio}> */}
            {results.map((result,index) => {
                return (
                    <TableRow key={index}>
                        <TableCell >
                            {/* <FormControlLabel value={`radio_${index}`} control={<Radio />} label="" /> */}
                            <Radio key={index} checked={`radio_${index}` === activeRadio} value={`radio_${index}`} onChange={()=>changeHandle(`radio_${index}`)}/>
                         </TableCell>
                         <TableCell component="th" scope="row">
                            {result.q}
                         </TableCell>
                         <TableCell>
                            {result.frequencyDifference}
                         </TableCell>
                    </TableRow>
                )
            })}
             {/* </RadioGroup> */}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ResultSection;