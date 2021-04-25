import React, { useState } from 'react';
import { ResultBackend } from '../../../../types/Result';
import { GetConverterResultRequest } from '../../../../types/Converter';
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
    Card,
    CardContent,
    Typography
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { saveResult, selectCurrentResult, selectActiveCurrentResult } from '../../../../store/resultReducer';
import { selectPointsOnScreen, selectHubConnectionId, selectIsFitError } from '../../../../store/chartDataReducer';
import { selectConverterInfo } from '../../../../store/settingsReducer';
import { selectEmptyResonator } from '../../../../store/resonatorReducer';
import { ConverterResultMapper } from '../../../../mappers/converterResult';
import { createRequestObject, apiCall } from '../../../../apiCall/apiCall';
import {    EmptyResonatorSection } from '../../Sections';

const ResultSection: React.FC = () => {
    const [IsObjectInside, seIsObjectInside] = useState(false);
    const [resultName, setResultName] = useState('');
    const [h, setH] = useState('');

    const connectionId: string = useSelector(selectHubConnectionId);
    const resultFromRedux: ResultBackend[] = useSelector(selectCurrentResult);
    const pointsOnScreen: number = useSelector(selectPointsOnScreen);
    const converterInfo: ConverterInfo = useSelector(selectConverterInfo);
    const emptyResonator: EmptyResonator = useSelector(selectEmptyResonator);
    const activeResult: ResultBackend = useSelector(selectActiveCurrentResult);
    const isFitError: boolean = useSelector(selectIsFitError)
    const dispatch = useDispatch();

    const handleSaveResultButton = async() => {
        const getConverterResultRequest: GetConverterResultRequest = {
            ResonatorName: converterInfo.resonatorName,
            ResonatorType: converterInfo.resonatorType,
            H: h !== '' ? h :'0.0',
            CenterFrequency: activeResult.CenterFrequency.toString(),
            QFactor: activeResult.Q_factor.toString(),
            UnloadedCenterFrequency: emptyResonator.centerFrequency.toString(),
            UnloadedQ: emptyResonator.qFactor.toString(),
        };
        const converterResult = await getConverterResult(getConverterResultRequest);
        let result = {    
            sampleName: resultName !== '' ? resultName : 'Default Sample Name',
            frequencyDifference: activeResult.CenterFrequencyDifference,
            h: h !== '' ? h :'0.0',
            permittivity: converterResult && converterResult.Permittivity !== undefined ? converterResult.Permittivity: '',
            dielLossTangent: converterResult && converterResult.DielectricLossTangent !== undefined ? converterResult.DielectricLossTangent: '',
            resistivity: converterResult && converterResult.Resistivity !== undefined ? converterResult.Resistivity: '',
            sheetResistance: converterResult && converterResult.SheetRessistance !== undefined ? converterResult.SheetRessistance: '',
            f0: activeResult.CenterFrequency,
            q: activeResult.Q_factor,
            bw: activeResult.Bandwidth,
            peak: activeResult.PeakTransmittance,
            points: pointsOnScreen,
        }
                                 
        dispatch(saveResult(result));
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

    const handleInsertObject = async() => {
        const newIsObjectInside = !IsObjectInside;
        const request = createRequestObject(
            'POST',
            'https://localhost:44353/api/Home/PutOnOfObject',
            JSON.stringify({ 'connectionId': connectionId, 'IsObjectInside': newIsObjectInside }));
        seIsObjectInside(newIsObjectInside);
        return await apiCall(request);              
    }

    return (
        <Card>
            <CardContent>
             <Typography variant="h6">{'Result'}</Typography>
             {isFitError && <Typography className={styles.isFitError} variant="body1">{'Possible fit error'}</Typography>}
            {resultFromRedux.length <= 1 || resultFromRedux.length >= 10 ? (
            <><ResultContent result={resultFromRedux[0]} pointsOnScreen={pointsOnScreen}/>
            </>):(<ManyResultsContent results={resultFromRedux}/>)}
            <br/>
            <Grid container>
                <Grid container>
                    <Grid item xs={12} xl={12}>
                    <div className={styles.merginBottom} >
                        <TextField label="h [mm]" 
                               variant="outlined"
                               size='small'
                               type={'number'}
                               value={h}
                               onChange={(e) => setH(e.target.value)}/>
                    </div>
                </Grid></Grid>
                <Grid item xs={9} xl={9}>
                    <TextField label="Name" 
                               variant="outlined" 
                               size='small'
                               value={resultName}
                               onChange={(e) => setResultName(e.target.value)}/>
                </Grid>
                <Grid item xs={3} xl={3}>
                    <Button variant="contained" 
                            color="primary" 
                            size='large'
                            onClick={() => handleSaveResultButton()}>
                        {'Save'}
                    </Button>
                </Grid> 
            </Grid> <br/>
                    <Button variant="contained" 
                            color="secondary" 
                            size='small'
                            onClick={handleInsertObject}>
                        {'temporary button insert object'}
                    </Button>
                    <EmptyResonatorSection />
            </CardContent>
        </Card>
    )
}

export default ResultSection;