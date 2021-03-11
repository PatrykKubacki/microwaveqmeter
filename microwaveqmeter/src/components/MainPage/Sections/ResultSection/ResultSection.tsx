import React, { useState } from 'react';
import Section from '../Section/Section';
import { Result, ResultBackend } from '../../../../types/Result';
import { GetConverterResultRequest, SplitPostResult } from '../../../../types/Converter';
import { ConverterInfo } from '../../../../types/Settings';
import { EmptyResonator } from '../../../../types/EmptyResonator';
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
import { selectConverterInfo } from '../../../../store/settingsReducer';
import { selectEmptyResonator } from '../../../../store/resonatorReducer';
import { ConverterResultMapper } from '../../../../mappers/converterResult';

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
    const converterInfo: ConverterInfo = useSelector(selectConverterInfo);
    const emptyResonator: EmptyResonator = useSelector(selectEmptyResonator);
    const dispatch = useDispatch();
    const handleSaveResultButton = async() => {
        const getConverterResultRequest: GetConverterResultRequest = {
            ResonatorName: converterInfo.resonatorName,
            ResonatorType: converterInfo.resonatorType,
            H: h !== '' ? h :'0.0',
            CenterFrequency: resultFromRedux.CenterFrequency.toString(),
            QFactor: resultFromRedux.Q_factor.toString(),
            UnloadedCenterFrequency: emptyResonator.centerFrequency.toString(),
            UnloadedQ: emptyResonator.qFactor.toString(),
        };
        const converterResult = await getConverterResult(getConverterResultRequest);
        let result = {    
            sampleName: resultName !== '' ? resultName : 'Default Sample Name',
            frequencyDifference: resultFromRedux.CenterFrequencyDifference,
            h: h !== '' ? h :'0.0',
            permittivity: converterResult && converterResult.Permittivity !== undefined ? converterResult.Permittivity: '',
            dielLossTangent: converterResult && converterResult.DielectricLossTangent !== undefined ? converterResult.DielectricLossTangent: '',
            resistivity: converterResult && converterResult.Resistivity !== undefined ? converterResult.Resistivity: '',
            sheetResistance: converterResult && converterResult.SheetRessistance !== undefined ? converterResult.SheetRessistance: '',
            f0: resultFromRedux.CenterFrequency,
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

    const getConverterResult = async (body: GetConverterResultRequest) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        return await fetch('https://localhost:44353/api/Home/GetConverterResult', requestOptions)
            .then(response => response.json())
            .then(response => ConverterResultMapper(response, body))
            .catch((error) => {
                console.error('Error:', error);
              });
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